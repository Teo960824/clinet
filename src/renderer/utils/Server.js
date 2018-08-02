const axios = require('axios');
const qs = require('qs');
// 正则表达式
// const regEmail = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
// const regTel = /^1[34578]\d{9}$/
const ChartScatter = require('./ChartScatter');
const ChartRadar = require('./ChartRadar');
const ChartBar = require('./ChartBar');
const ChartLine = require('./ChartLine');
const ChartPie = require('./ChartPie');
const ChartData = require('./ChartData');

//  测试连接服务器
export function sConnect(obj, data, index) {
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/servers/connect/`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      if (res.data.success) {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [index, '连接成功'])
        obj.$store.commit('SET_NOTICE', '连接成功')
      } else {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [index, '连接失败'])
        obj.$store.commit('SET_NOTICE', '连接失败')
      }
    } else {
      obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [index, '连接失败'])
      obj.$store.commit('SET_NOTICE', '连接失败')
    }
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [index, '连接失败'])
    obj.$store.commit('SET_NOTICE', '连接失败')
  })
}
// ------------病案
// 病案查询
export function sGetWt4(obj, data, page, type) {
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/library/wt4?page=${page}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (type === 'stat') {
      if (res.status === 200) {
        const keys = Object.keys(res.data.data[0])
        const newWt4 = []
        newWt4.push(keys)
        res.data.data.forEach((x) => {
          newWt4.push(keys.map((k) => {
            let a = []
            if (typeof (x[k]) === 'object') {
              if (x[k] !== null) {
                a = x[k].join(',')
              } else {
                a = ''
              }
            } else {
              a = x[k]
            }
            return a
          }))
        })
        res.data.data = newWt4
        // const resObj = { page: parseInt(res.data.page, 10), countPage: res.data.count, data: res.data.stat, pageList: res.data.page_list, tableName: tableName, tableSel: res.data.num, dimensionOrg: res.data.org_num, dimensionTime: res.data.time_num, dimensionDrg: res.data.drg_num }
        const a = res.data
        a.tableSel = res.data.num
        a.dimensionOrg = res.data.org_num
        a.dimensionTime = res.data.time_num
        a.dimensionDrg = res.data.drg_num
        obj.$store.commit('STAT_SET_SERVER_TABLE', a)
        ChartData.default(obj, res.data.data, obj.$store.state.Stat.selectedRow, obj.$store.state.Stat.selectedCol)
        switch (obj.$store.state.Stat.chartLeft) {
          case '柱状图':
            ChartBar.default('chartLeft', obj.$store.state.Stat.chartData)
            break;
          case '折线图':
            ChartLine.default('chartLeft', obj.$store.state.Stat.chartData)
            break;
          case '雷达图':
            ChartRadar.default('chartLeft', obj.$store.state.Stat.chartData)
            break;
          case '散点图':
            ChartScatter.default('chartLeft', obj.$store.state.Stat.chartData)
            break;
          case '饼图':
            ChartPie.default('chartLeft', obj.$store.state.Stat.chartData)
            break;
          default: break;
        }
        switch (obj.$store.state.Stat.chartRight) {
          case '柱状图':
            ChartBar.default('chartRight', obj.$store.state.Stat.chartData)
            break;
          case '折线图':
            ChartLine.default('chartRight', obj.$store.state.Stat.chartData)
            break;
          case '雷达图':
            ChartRadar.default('chartRight', obj.$store.state.Stat.chartData)
            break;
          case '散点图':
            ChartScatter.default('chartRight', obj.$store.state.Stat.chartData)
            break;
          case '饼图':
            ChartPie.default('chartRight', obj.$store.state.Stat.chartData)
            break;
          default: break;
        }
      }
    } else if (res.status === 200) {
      obj.$store.commit('SYSTEM_SET_WT4', [res.data, '病案查询成功', true])
    } else {
      obj.$store.commit('SYSTEM_SET_WT4', [{}, '病案查询失败', false])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SYSTEM_SET_WT4', [{}, '连接失败', false])
  })
}
// 分组规则查询
export function sGetCompRule(obj, data, table, rule) {
  let code = ''
  switch (table) {
    case 'mdc':
      code = '';
      break;
    case 'adrg':
      code = rule.mdc;
      break;
    case 'drg':
      code = rule.code;
      break;
    default:
      code = '';
  }
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/library/server_rule?table=${table}&code=${code}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('SYSTEM_GET_COMPRULE', [res.data, '规则查询成功', true])
    } else {
      obj.$store.commit('SYSTEM_GET_COMPRULE', [{}, '规则查询成功', false])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SYSTEM_GET_COMPRULE', [{}, '连接失败', false])
  })
}
// 单条分组
export function sCompDrg(obj, data, dataWt4, version, type = '') {
  let diagsCode = dataWt4.diags_code
  let opersCode = dataWt4.opers_code
  let url = ''
  switch (version) {
    case 'BJ':
      url = `http://${data[0]}:${data[1]}/drgserverbj/comp_drg/`
      break;
    case 'GB':
      url = `http://${data[0]}:${data[1]}/drgservergb/comp_drg/`
      break;
    case 'CN':
      url = `http://${data[0]}:${data[1]}/drgserver/comp_drg/`
      break;
    default:
      url = `http://${data[0]}:${data[1]}/drgserver/comp_drg/`
  }
  if (dataWt4) {
    if (type !== '') {
      diagsCode = diagsCode.split('-')
      opersCode = opersCode.split('-')
    }
    diagsCode = diagsCode.join('","')
    opersCode = opersCode.join('","')
    const wt4 = { ACCTUAL_DAYS: dataWt4.acctual_days, B_WT4_V1_ID: dataWt4.b_wt4_v1_id, DISEASE_CODE: dataWt4.disease_code, AGE: dataWt4.age, GENDER: dataWt4.gender, SF0100: dataWt4.sf0100, SF0102: dataWt4.sf0102, SF0104: dataWt4.sf0104, SF0108: dataWt4.sf0108, TOTAL_EXPENSE: dataWt4.total_expense, diags_code: `["${diagsCode}"]`, opers_code: `["${opersCode}"]` }
    axios({
      method: 'post',
      url: url,
      data: qs.stringify(wt4),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      responseType: 'json'
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        if (version === 'CN') {
          obj.$store.commit('SYSTEM_GET_WT4_COMP', [res.data.result, '病案分组成功', true])
        } else {
          obj.$store.commit('SYSTEM_GET_WT4_COMP', [res.data, '病案分组成功', true])
        }
      } else {
        obj.$store.commit('SYSTEM_GET_WT4_COMP', [{}, '病案分组失败', true])
      }
    }).catch((err) => {
      console.log(err)
      obj.$store.commit('SYSTEM_GET_WT4_COMP', [{}, '连接失败', true])
    })
  } else {
    obj.$store.commit('SYSTEM_GET_WT4_COMP', [{}, '病案分组失败,病案不存在', true])
  }
}
// 获取分析字段和范围
export function sGetTarget(obj, data, type) {
  console.log(obj.$store.state.System.user.username)
  let url = ''
  if (type === 'list') {
    url = `http://${data[0]}:${data[1]}/stat/target1?username=${obj.$store.state.System.user.username}`
  } else {
    url = `http://${data[0]}:${data[1]}/stat/target?file=${type}`
  }
  axios({
    method: 'get',
    url: url,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (type === 'list') {
      console.log(res)
      obj.$store.commit('SYSTEM_GET_TARGET_LIST', res.data.list)
      obj.$store.commit('STAT_SET_CUSTOM_INDEX', res.data.key)
    } else {
      console.log(res)
      obj.$store.commit('SYSTEM_GET_TARGET', res.data)
    }
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SYSTEM_GET_TARGET', {})
  })
}

export function sGetTargetKey(obj, data, type, username) {
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/stat/target_key?file=${type}&username=${username}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    obj.$store.commit('SYSTEM_GET_TARGET_LIST_KEY', res.data)
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SYSTEM_GET_TARGET', {})
  })
}

function fileInsert(obj, data) {
  axios({
    method: 'GET',
    url: `http://${data[0]}:${data[1]}/servers/wt4_insert`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('SYSTEM_UPLOAD_FILE', res)
      obj.$store.commit('SET_NOTICE', `文件上传${res.data}条`)
    } else {
      obj.$store.commit('SYSTEM_PROVINCE', [])
    }
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SYSTEM_PROVINCE', [])
  })
}

function fileUploadDoc(obj, data, res) {
  axios({
    method: 'GET',
    url: `http://${data[0]}:${data[1]}/hospitals/json_check?file_path=${res.file_path}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      fileInsert(obj, data)
      // obj.$store.commit('SYSTEM_PROVINCE', res.data)
    } else {
      obj.$store.commit('SYSTEM_PROVINCE', [])
    }
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SYSTEM_PROVINCE', [])
  })
}
// 上传病案
export function sUploadDoc(obj, data, fileName, f) {
  if (fileName && f) {
    const content = f.join('\n')
    const objFile = new File([content], fileName);
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    fd.append('file', objFile);
    xhr.open('POST', `http://${data[0]}:${data[1]}/servers/wt4_upload/`, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        obj.$store.commit('SET_NOTICE', '文件上传成功!')
        const res = JSON.parse(xhr.responseText)
        fileUploadDoc(obj, data, res)
      } else {
        // obj.$store.commit('SYSTEM_UPLOAD_FILE', {})
      }
    }
    xhr.send(fd);
  }
}
// 获取省份
export function sGetProvince(obj, data) {
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/servers/province/`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('SYSTEM_PROVINCE', res.data)
    } else {
      obj.$store.commit('SYSTEM_PROVINCE', [])
    }
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SYSTEM_PROVINCE', [])
  })
}
// 2.2.5 保存用户自定义分析
export function sSaveDefined(obj, data) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/stat/save_defined/`,
    data: qs.stringify({ username: 'hitb', key: ['fee_avg'] }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}
// 增加帮助功能
export function sUpHelp(obj, data, name, content) {
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/edit/helpinsert?name=${name}&content=${content}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 分享文件
export function share(obj, data, type, fileName, username, content) {
  if (type !== 'edit') {
    content = content.join('","')
  }
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/servers/share`,
    data: qs.stringify({ username: username, type: type, file_name: fileName, content: `["${content}"]` }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('SET_NOTICE', '文件分享完毕!')
    }
    // console.log(res)
  }).catch((err) => {
    console.log(err)
  })
  if (type === 'stat') {
    obj.$store.commit('STAT_SET_TABLE_TYPE', 'server')
  }
}
