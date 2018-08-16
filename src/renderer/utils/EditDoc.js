// CDA转换为section结构
// const cda = ['a b c', 'b c d', '个人信息', '姓名 瞪大', '性别 男', '年龄 19', '主诉', '头 痛 3天', '体格检查', '体态 正常', '步态 正常', '心率 120']
// const x = cda.map(m => m.split(' ').filter(i => i !== ''))

function editDoc(x, sectionList) {
  const obj = {}
  let key = ''
  let n = 0
  obj[key] = []
  x.forEach((x) => {
    x = [n].concat(x)
    n += 1
    let sectionList1 = global.hitbSections
    if (sectionList.length !== 0) {
      sectionList1 = sectionList
    }
    if (sectionList1.includes(x[1])) {
      key = x
      if (!obj[key]) {
        obj[key] = []
      }
    } else {
      obj[key].push(x)
    }
  })
  return obj
}

export default editDoc
