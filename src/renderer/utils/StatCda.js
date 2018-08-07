import { getEdit } from './EditServerFile';
const axios = require('axios');
export default function statCda(obj, data = ['127.0.0.1', '80']) {
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/stat/get_rule?`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('LIBRARY_SET_COMP_RULE', res.data)
    }
  }).catch((err) => {
    console.log(err);
  })
  // get_rule
  getEdit(obj, ['127.0.0.1', '80'], 'test@test.com.cn-1_20180619131935.cda', 'server', '');
  const file = obj.$store.state.Edit.file[0].split(',');
  const stat = {}
  file.forEach((item) => {
    const [key, val] = item.split(' ');
    if (val) {
      stat[key] = val.split('，');
    }
  });
  // 病历分析结果
  const cda = { symptom: [], pmh: [], mh: [], gender: '', age: '' };
  const cdaRes = { diags_code: [] };
  // 主诉
  const symptom = stat['主诉'];
  symptom.forEach((item) => {
    const s = item.split(`${item.replace(/[^0-9]/ig, '')}`)[0];
    const cdaSymptom = cda.symptom;
    cdaSymptom.push(s);
    cda.symptom = cdaSymptom
  });
  // 既往史
  const pmh = stat['既往史'];
  pmh.forEach((item) => {
    const cdaPmhArray = cda.pmh;
    cdaPmhArray.push(item.split('；'));
    const cdaPmh = [].concat(...cdaPmhArray)
    cda.pmh = cdaPmh;
  });
  // 现病史
  const mh = stat['现病史'];
  mh.forEach((item) => {
    const cdaMhArray = cda.pmh;
    cdaMhArray.push(item.split('；'));
    const cdaMh = [].concat(...cdaMhArray)
    cda.mh = cdaMh;
  });
  cda.gender = stat['性别'];
  cda.age = stat['年龄'];
  // 判断
  // const ruleIcd10 = obj.$store.state.Library.compRule.icd10;
  // const ruleIcd9 = obj.$store.state.Library.compRule.icd9;
  const ruleSymptom = obj.$store.state.Library.compRule.symptom;
  // const rulePharmacy = obj.$store.state.Library.compRule.pharmacy;
  cda.symptom.forEach((s) => {
    const diagsCode = cdaRes.diags_code;
    diagsCode.push(ruleSymptom[s]);
    cdaRes.diags_code = diagsCode;
  })
  // console.log(cda);
  // console.log(stat);
  // console.log('----------------------');
}

// 清空对比
export function test(obj) {
  console.log(obj);
  return true
}
