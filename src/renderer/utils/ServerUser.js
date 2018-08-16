const axios = require('axios');
const qs = require('qs');
// 正则表达式
const regEmail = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
const regTel = /^1[34578]\d{9}$/

// 注册
export function sRegister(obj, data, user) {
  // 取出user
  const isEmail = regEmail.test(user.username)
  // const isTel = regTel.test(user.tel)
  if (isEmail !== '') {
    axios({
      method: 'post',
      url: `http://${data[0]}:${data[1]}/servers/user/`,
      data: qs.stringify({ user: user }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      responseType: 'json'
    }).then((res) => {
      if (res.status === 201) {
        if (res.data.success) {
          obj.$store.commit('SYSTEM_REGISTER_USER', [res.data, '用户创建成功', true])
          obj.$store.commit('SET_NOTICE', '用户创建成功')
          obj.$store.commit('SYSTEM_SET_TOOLBAR', 'getUsers')
        } else {
          obj.$store.commit('SET_NOTICE', '用户名重复')
          // obj.$store.commit('SYSTEM_REGISTER_USER', [res.data, '用户创建失败,用户名重复', false])
        }
      } else {
        // obj.$store.commit('SYSTEM_REGISTER_USER', [res.data, '连接失败', false])
      }
    }).catch((err) => {
      obj.$store.commit('SET_NOTICE', '连接服务器错误')
      console.log(err);
      // obj.$store.commit('SYSTEM_REGISTER_USER', [{}, '连接失败', false])
    })
  } else {
    let info = ''
    if (isEmail) {
      info = '请输入正确的Email地址'
    }
    obj.$store.commit('SYSTEM_REGISTER_USER', [user, info, false])
  }
}
// 获取用户列表
export function sGetUsers(obj, data, page) {
  axios.get(`http://${data[0]}:${data[1]}/servers/user?page=${page}`)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_GET_USERS', res.data)
      }
    })
    .catch((err) => {
      obj.$store.commit('SET_NOTICE', '连接服务器错误')
      console.log(err);
    });
}
// 更新用户信息
export function sUpdateUser(obj, data, id, user) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/servers/user_update/`,
    data: qs.stringify({ id: id, user: user }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (obj.$store.state.System.toolbar !== 'getPersons') {
      const objs = res.data.data
      objs.login = true
      obj.$store.commit('SYSTEM_SET_USER', ['更新用户信息成功', res.data.data])
    }
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SET_NOTICE', '连接服务器错误')
    obj.$store.commit('SYSTEM_SET_USER', ['更新用户信息失败', { username: '', login: false }])
  })
}
// ------------机构管理
// 获取机构信息多条
export function sGetOrg(obj, data, userOrg, page) {
  let url = ''
  // 根据用户权限判断取值
  if (userOrg.type === 1) {
    url = `http://${data[0]}:${data[1]}/servers/org?page=${page}`
  } else {
    url = `http://${data[0]}:${data[1]}/servers/org?name=${userOrg}&page=${page}`
  }
  axios.get(url)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_GET_ORGS', res.data)
      } else {
        obj.$store.commit('SYSTEM_GET_ORGS', [])
      }
    })
    .catch((err) => {
      console.log(err);
      obj.$store.commit('SET_NOTICE', '连接服务器错误')
      obj.$store.commit('SYSTEM_GET_ORGS', [])
    });
}
// 新建机构
export function sCreateOrg(obj, data, org) {
  // 正则判断
  const isEmail = regEmail.test(org.email)
  const isTel = regTel.test(org.tel)
  if (isEmail && isTel) {
    axios({
      method: 'post',
      url: `http://${data[0]}:${data[1]}/servers/org/`,
      data: qs.stringify({ org: { code: org.code, name: org.name, level: org.level, type: org.type, province: org.province, city: org.city, person_name: org.person_name, tel: org.tel, email: org.email, is_show: false, is_ban: false, county: org.county, stat_org_name: '1' } }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      responseType: 'json'
    }).then((res) => {
      if (res.status === 201) {
        if (res.data.success) {
          obj.$store.commit('SYSTEM_NEW_ORG', [res.data, '机构创建成功', true])
          obj.$store.commit('SYSTEM_SET_TOOLBAR', 'getOrgs')
          obj.$store.commit('SET_NOTICE', '机构创建成功')
        } else {
          obj.$store.commit('SYSTEM_NEW_ORG', [res.data, '机构创建失败,机构编码重复', false])
        }
      } else {
        obj.$store.commit('SYSTEM_NEW_ORG', [res.data, '连接失败', false])
      }
    }).catch((err) => {
      console.log(err);
      obj.$store.commit('SET_NOTICE', '连接服务器错误')
      obj.$store.commit('SYSTEM_NEW_ORG', [{}, '连接失败', false])
    })
  } else {
    let info = ''
    if (isEmail) {
      info = '请输入正确的Email地址'
    } else {
      info = '请输入正确的手机号码'
    }
    obj.$store.commit('SYSTEM_NEW_ORG', [org, info, false])
  }
}
// 更新机构信息
export function sUpdateOrg(obj, data, id, org) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/servers/org_update`,
    data: qs.stringify({ id: id, org: org }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 201) {
      if (res.data.success) {
        obj.$store.commit('SYSTEM_NEW_ORG', [res.data, '机构更新成功', true])
        obj.$store.commit('SYSTEM_SET_TOOLBAR', 'getOrgs')
        obj.$store.commit('SET_NOTICE', '机构更新成功')
      } else {
        obj.$store.commit('SYSTEM_NEW_ORG', [res.data, '机构更新失败', false])
      }
    } else {
      obj.$store.commit('SYSTEM_NEW_ORG', [res.data, '连接失败', false])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SET_NOTICE', '连接服务器错误')
    obj.$store.commit('SYSTEM_NEW_ORG', [{}, '连接失败', false])
  })
}
// 获取科室列表([url,port,user])
export function sGetDepart(obj, data, org, page) {
  const userOrg = org.org
  const userType = org.type
  let url = ''
  // 根据用户权限判断取值
  if (userType === 1) {
    url = `http://${data[0]}:${data[1]}/servers/customize_department?page=${page}`
  } else {
    url = `http://${data[0]}:${data[1]}/servers/customize_department?name=${userOrg}&page=${page}`
  }
  axios.get(url)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_GET_DEPARTMENTS', res.data)
      } else {
        obj.$store.commit('SYSTEM_GET_DEPARTMENTS', [])
      }
    })
    .catch((err) => {
      console.log(err);
      obj.$store.commit('SET_NOTICE', '连接服务器错误')
      obj.$store.commit('SYSTEM_GET_DEPARTMENTS', [])
    });
}
// 新建科室([url,port,user,obj])
export function sCreateDepart(obj, data, user, department) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/servers/customize_department/`,
    data: qs.stringify({ customize_department: { wt_code: department.code, wt_name: department.name, c_user: user.username, class: department.class, department: department.department, cherf_department: department.cherf_department, professor: department.professor, is_spe: department.is_spe, is_imp: department.is_imp, is_ban: false, org: user.org } }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
    if (res.status === 201) {
      if (res.data.success) {
        obj.$store.commit('SYSTEM_NEW_DEPARTMENT', [res.data, '科室创建成功', true])
        // obj.$store.commit('SYSTEM_SET_TOOLBAR', 'getDepart')
        obj.$store.commit('SET_NOTICE', '科室创建成功')
      } else {
        obj.$store.commit('SYSTEM_NEW_DEPARTMENT', [res.data, '科室创建失败,机构编码重复', false])
        obj.$store.commit('SET_NOTICE', '科室更新失败,机构编码重复')
      }
    } else {
      obj.$store.commit('SYSTEM_NEW_DEPARTMENT', [res.data, '连接失败', false])
      obj.$store.commit('SET_NOTICE', '连接失败')
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SYSTEM_NEW_DEPARTMENT', [{}, '连接失败', false])
    obj.$store.commit('SET_NOTICE', '连接失败')
  })
}
// 更新科室信息
export function sUpdateDepart(obj, data, id, customizeDepartment) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/servers/customize_department_update/`,
    data: qs.stringify({ id: id, customize_department: customizeDepartment }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
    if (res.status === 200) {
      if (res.data.success) {
        obj.$store.commit('SYSTEM_NEW_DEPARTMENT', [res.data, '科室更新成功', true])
        // obj.$store.commit('SYSTEM_SET_TOOLBAR', 'getDepart')
        obj.$store.commit('SET_NOTICE', '科室更新成功')
      } else {
        obj.$store.commit('SYSTEM_NEW_DEPARTMENT', [res.data, '科室更新失败,机构编码重复', false])
        obj.$store.commit('SET_NOTICE', '科室更新失败,机构编码重复')
      }
    } else {
      obj.$store.commit('SYSTEM_NEW_DEPARTMENT', [res.data, '连接失败', false])
      obj.$store.commit('SET_NOTICE', '连接失败')
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SYSTEM_NEW_DEPARTMENT', [{}, '连接失败', false])
    obj.$store.commit('SET_NOTICE', '连接失败')
  })
}
