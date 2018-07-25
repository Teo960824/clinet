import saveFile from './SaveFile'
import { saveEdit, getDocContent } from './EditServerFile'
// import loadFile from './LoadFile'
export function saveEditDoc(obj, data) {
  const date = new Date();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = `0${strDate}`
  }
  const currentdate = `${date.getFullYear()}-${month}-${strDate} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  obj.$store.commit('EDIT_UPDATE_DOC_HEADER', ['保存时间', currentdate]);
  obj.$store.commit('EDIT_SET_DOC_STATE');
  const fileName = obj.$store.state.Edit.fileName
  let doc = obj.$store.state.Edit.doc
  doc = doc.filter(x => x !== '')
  doc = doc.map(x => x.join(' '))
  let x = ''
  let p = ''
  // if (data === '保存模板') {
  //   obj.saveType = '保存模板'
  //   if (!obj.$store.state.Edit.modelName) {
  //     obj.$store.commit('SET_NOTICE', '请输入模板名称！')
  //   } else {
  //     saveEdit(obj, [obj.$store.state.System.server, obj.$store.state.System.port], obj.$store.state.Edit.modelName, [doc.toString()], obj.$store.state.System.user.username, 1, obj.$store.state.Edit.docType, '模板', '')
  //   }
  // } else if (data === '保存病案') {
  //   obj.saveType = '保存病案'
  //   if (obj.$store.state.Edit.files[obj.$store.state.Edit.filesIndex] !== obj.$store.state.System.user.username) {
  //     const index = obj.$store.state.Edit.files.indexOf(obj.$store.state.System.user.username)
  //     saveEdit(obj,
  //       [obj.$store.state.System.server, obj.$store.state.System.port],
  //       obj.$store.state.Edit.files[index],
  //       [doc.toString()], obj.$store.state.System.user.username,
  //       '新建', obj.$store.state.Edit.docType, '病案',
  //       obj.$store.state.Edit.serverId)
  //   } else {
  //     saveEdit(obj,
  //       [obj.$store.state.System.server, obj.$store.state.System.port],
  //       obj.$store.state.Edit.files[obj.$store.state.Edit.filesIndex],
  //       [doc.toString()], obj.$store.state.System.user.username,
  //       '新建', obj.$store.state.Edit.docType, '病案',
  //       obj.$store.state.Edit.serverId)
  //   }
  //   if (fileName.includes('@')) {
  //     saveEdit(obj,
  //       [obj.$store.state.System.server, obj.$store.state.System.port],
  //       obj.$store.state.Edit.files[obj.$store.state.Edit.filesIndex],
  //       [doc.toString()], obj.$store.state.System.user.username,
  //       '新建', obj.$store.state.Edit.docType, '病案',
  //       obj.$store.state.Edit.serverId)
  //   } else {
  //     if (obj.$store.state.Edit.lastNav === '/stat') {
  //       x = obj.$store.state.Stat.fileName
  //     } else {
  //       x = obj.$store.state.Edit.files[obj.$store.state.Edit.filesIndex]
  //     }
  //     p = obj.$store.state.Edit.lastNav
  //     saveFile(obj, x, p)
  //     obj.$store.commit('EDIT_SET_DELETE_LOCAL', obj.$store.state.Edit.fileIndex)
  //   }
  // }
  // console.log(fileName)
  if (fileName.includes('@')) {
    if (data === '保存模板') {
      if (!obj.$store.state.Edit.modelName) {
        obj.$store.commit('SET_NOTICE', '请输入模板名称！')
      } else {
        saveEdit(obj, [obj.$store.state.System.server, obj.$store.state.System.port], obj.$store.state.Edit.files[obj.$store.state.Edit.filesIndex], [doc.toString()], obj.$store.state.System.user.username, 1, obj.$store.state.Edit.docType, '模板')
      }
    } else if (data === '保存病案') {
      saveEdit(obj, [obj.$store.state.System.server, obj.$store.state.System.port], obj.$store.state.Edit.files[obj.$store.state.Edit.filesIndex], [doc.toString()], obj.$store.state.Edit.serverId, obj.$store.state.System.user.username, 1, obj.$store.state.Edit.docType, '病案')
    }
    obj.$store.commit('EDIT_SET_DELETE_SERVER', obj.$store.state.Edit.filesIndex)
  } else {
    if (data === '保存模板') {
      obj.saveType = '保存模板'
    } else {
      obj.saveType = '保存病案'
    }
    if (obj.$store.state.Edit.lastNav === '/stat') {
      x = obj.$store.state.Stat.fileName
    } else {
      x = obj.$store.state.Edit.files[obj.$store.state.Edit.filesIndex]
    }
    p = obj.$store.state.Edit.lastNav
    saveFile(obj, x, p)
    obj.$store.commit('EDIT_SET_DELETE_LOCAL', obj.$store.state.Edit.fileIndex)
  }
}

export function cacheEditDoc(obj) {
  const date = new Date();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = `0${strDate}`
  }
  const currentdate = `${date.getFullYear()}-${month}-${strDate} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  obj.$store.commit('EDIT_UPDATE_DOC_HEADER', ['缓存时间', currentdate]);
  obj.$store.commit('EDIT_SET_DOC_STATE');
  const fileIndex = obj.$store.state.Edit.fileIndex
  if (fileIndex >= 0) {
    let doc = obj.$store.state.Edit.doc
    doc = doc.filter(x => x !== '')
    doc = doc.map(x => x.join(' '))
    const docHeader = obj.$store.state.Edit.docHeader
    const keys = Object.keys(docHeader)
    const values = Object.values(docHeader)
    let string = ''
    keys.forEach((x, key) => {
      let a = ''
      if (values[key] && values[key].includes(' ')) {
        a = values[key].replace(/ /g, '　')
      } else {
        a = values[key]
      }
      if (string === '') {
        string = `${x}:${a}`
      } else {
        string = `${string};${x}:${a}`
      }
    })
    if (doc[0] && doc[0].includes('创建时间')) {
      doc.splice(0, 1, string);
    } else {
      doc.splice(0, 0, string);
    }
    obj.$store.commit('EDIT_SET_IS_SAVE_LOCAL', fileIndex);
    obj.$store.commit('EDIT_SAVE_DOC', [fileIndex, doc.toString()]);
    const summary = []
    const diag = []
    doc.forEach((x) => {
      const b = x.split(';')
      let creatTime = ''
      b.forEach((x) => {
        if (x.includes('创建时间')) {
          creatTime = x
        }
        if (x.includes('诊断')) {
          diag.push(x)
        }
      })
      const diag1 = []
      diag.forEach((x) => {
        diag1.push(x.replace(/ /g, ':'))
      })
      if (x.includes('创建时间') || x.includes('诊断')) {
        summary.push([fileIndex, creatTime, diag1.toString()])
      }
    })
    obj.$store.commit('EDIT_ADD_DOC_SUMMARY', summary);
    // saveFile(obj, '未保存病案.cda', '/edit')
  } else {
    obj.$store.commit('SET_NOTICE', '请先打开一个文件，然后选择编辑一个文档，或者新建一个文档！')
    obj.$store.commit('EDIT_SET_HINT_TYPE', 'notice');
  }
}

export function newEditDoc(obj, n) {
  obj.$store.commit('EDIT_SET_CHAT_TYPE', true);
  obj.$store.commit('EDIT_SET_DOC_INDEX', [0, true])
  obj.$store.commit('EDIT_SET_FILE_INDEX', obj.$store.state.Edit.file.length)
  obj.$store.commit('EDIT_SET_LEFT_PANEL', 'doc')
  obj.$store.commit('EDIT_SET_RIGHT_TYPE', 'left')
  obj.$store.commit('EDIT_SET_RIGHT_PANELS', '编辑病案')
  if (n) {
    obj.$store.commit('EDIT_SET_DOC_TYPE', n)
  } else { n = obj.$store.state.Edit.docType }
  obj.$store.commit('SET_NOTICE', n);
  obj.$store.commit('EDIT_SET_HINT_TYPE', 'notice');
  if (obj.$store.state.Edit.rightPanel === 'server') {
    getDocContent(obj, [obj.$store.state.System.server, obj.$store.state.System.port], obj.$store.state.System.user.username, n)
  } else if (global.hitbmodel[n] !== undefined) {
    obj.$store.commit('EDIT_LOAD_DOC', global.hitbmodel[n])
    obj.$store.commit('EDIT_ADD_DOC', '');
  } else { obj.$store.commit('EDIT_SET_DOC'); }
  // if (fileName.includes('@')) {
  //   saveEdit(obj, [obj.$store.state.System.server, obj.$store.state.System.port, obj.$store.state.Edit.files[obj.$store.state.Edit.filesIndex], [''], obj.$store.state.System.user.username, 2])
  // }
  const date = new Date();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = `0${strDate}`
  }
  const currentdate = `${date.getFullYear()}-${month}-${strDate} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  obj.$store.commit('EDIT_UPDATE_DOC_HEADER', ['创建时间', currentdate]);
  obj.$store.commit('EDIT_SET_DOC_STATE');
  obj.docType = n
  cacheEditDoc(obj);
  document.getElementById('edit-editbar-input').focus()
  // } else {
  // obj.$store.commit('EDIT_SET_HINT_TYPE', 'notice')
  // obj.$store.commit('SET_NOTICE', '请选择保存病案的文件！')
  // }
}
