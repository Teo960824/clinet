import saveFile from './SaveFile'
import { saveEdit, getDocContent, editDocState, editDocShow, getCaseHistory, getExpertHint, clinetHelp } from './EditServerFile'
import { join, message } from './Socket'
import { sCompDrg } from './Server'
import { getLibrary } from './LibraryServerFile'
import { getStat } from './StatServerFile'


export function getDate() {
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
  return currentdate
}

export function saveEditDoc(obj, data) {
  const currentdate = getDate()
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
  const currentdate = getDate()
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
  const currentdate = getDate()
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

// 读取文件
export function loadEditDoc(obj, data, index, type) {
  let doc = []
  if (type === 'edit') {
    obj.$store.commit('EDIT_SET_RIGHT_PANELS', '编辑病案');
    obj.$store.commit('EDIT_SET_FILE_INDEX', index)
    const r = []
    const file = obj.$store.state.Edit.file
    const type = typeof obj.$store.state.Edit.file[0]
    let h = []
    h = file[index]
    if (type === 'string') {
      h.split(',').forEach((key, i) => {
        if (data[i]) {
          r.push(`${key} ${data[i]}`)
        } else {
          r.push(`${key}`)
        }
      });
    } else {
      h.forEach((key, i) => {
        r.push(`${key} ${data[i]}`)
      });
    }
    obj.$store.commit('EDIT_LOAD_DOC', r)
    const header = r[0]
    if (header.includes('创建时间')) {
      const a = header.split(';')
      const d = a.map((x) => {
        const b = x.split(':')
        if (b[0] && b[0].includes('时间')) {
          const c = `${b[1]}:${b[2]}:${b[3]}`
          b[1] = c
          b.splice(2, 2)
        }
        return b
      })
      const obj1 = {}
      d.forEach((x) => {
        if (x[1].includes('undefined')) {
          x[1] = null
        }
        obj1[x[0]] = x[1]
      })
      obj.$store.commit('EDIT_SET_DOC_HEADER', obj1)
    }
    if (obj.$store.state.Edit.helpType === '在线交流') {
      obj.$store.commit('EDIT_SET_CHAT_TYPE', true)
      join(obj, obj.$store.state.Edit.fileName, obj.$store.state.System.user.username)
      obj.$store.commit('EDIT_SET_LEFT_PANEL', 'doc')
    } else if (obj.$store.state.Edit.selectedType === 'row') {
      obj.$store.commit('EDIT_SET_LEFT_PANEL', 'doc')
      obj.$store.commit('EDIT_SET_RIGHT_TYPE', 'left')
    }
    obj.$store.commit('EDIT_SET_RIGHT_TYPE', 'left')
    obj.$store.commit('EDIT_SET_DOC_INDEX', [0, true]);
    document.getElementById('edit-editbar-input').focus()
    doc = obj.$store.state.Edit.doc
    editDocState(obj, doc)
  } else {
    obj.$store.commit('EDIT_SET_RIGHT_PANELS', '病案参考');
    obj.$store.commit('EDIT_SET_FILE_INDEX', index)
    obj.$store.commit('EDIT_SET_HELP_TYPE', '病案参考');
    doc = obj.$store.state.Edit.docShow
    editDocShow(obj, [obj.$store.state.System.server, obj.$store.state.System.port], data)
  }
  obj.$store.commit('EDIT_SET_DOC_STATE')
}

export function editBarEnter(obj, targetValue) {
  if (obj.$store.state.Edit.editType === '病案编辑') {
    if (obj.$store.state.Edit.helpType === '病案历史') {
      getCaseHistory(obj, [obj.$store.state.System.server, obj.$store.state.System.port], obj.$store.state.Edit.doc, obj.$store.state.System.user.username)
    }
    if (obj.$store.state.Edit.rightPanels.includes('病案参考')) {
      editDocShow(obj, [obj.$store.state.System.server, obj.$store.state.System.port], targetValue)
    }
    if (targetValue.includes('~')) {
      obj.$store.commit('EDIT_SET_MODEL_NAME', targetValue.replace('~', ''));
      obj.$store.commit('EDIT_SET_BAR_VALUE', '');
    } else {
      let n = obj.$store.state.Edit.docIndex
      let value = targetValue
      if (obj.$store.state.Edit.selectedType !== 'col') {
        const vs = value.split('，').filter(i => i !== '');
        if (vs.length > 0) {
          vs.forEach((element, index) => {
            const v = element.split(' ').filter(i => i !== '');
            if (index > 0) {
              obj.$store.commit('EDIT_UPDATE_DOC', [n, v, true]);
            } else {
              obj.$store.commit('EDIT_UPDATE_DOC', [n, v]);
            }
            obj.$store.commit('EDIT_SET_DOC_INDEX', [1]);
            n += 1
            if (!global.hitbdata.cdhHeader.includes(v[0]) && obj.$store.state.Edit.rightPanels.includes('病案质控')) {
              obj.$store.commit('EDIT_ADD_DOC_CONTROL', v);
            }
            if (obj.$store.state.Edit.rightPanels.includes('专家提示') && v[0].includes('症状')) {
              getExpertHint(obj, [obj.$store.state.System.server, obj.$store.state.System.port], v)
            }
          });
        } else {
          obj.$store.commit('EDIT_DELETE_ITEM', n);
        }
        if (obj.$store.state.Edit.helpType === '在线交流') {
          message(obj, targetValue, obj.$store.state.System.user.username, 'doc')
        }
      } else {
        value = value.replace(/,/g, '，')
        const cv = value.split(' ').filter(i => i !== '');
        const col = obj.$store.state.Edit.selectedCol[0]
        obj.$store.commit('EDIT_UPDATE_FILE', [col, cv[1]]);
      }
      obj.$store.commit('EDIT_SET_HINT_TYPE', 'notice');
      obj.$store.commit('SET_NOTICE', '编辑 -> 缓存 -> 选择文件 -> 保存');
    }
  } else if (obj.$store.state.Edit.rightPanels.includes('病案编辑')) {
    message(obj, targetValue, obj.$store.state.System.user.username, 'message')
    obj.$store.commit('EDIT_SET_BAR_VALUE', '');
  }
  const currentdate = getDate()
  obj.$store.commit('EDIT_UPDATE_DOC_HEADER', ['修改时间', currentdate]);
  obj.$store.commit('EDIT_SET_DOC_STATE');
}

export function rightBarHelp(obj, n) {
  if (n) {
    // obj.$store.commit('EDIT_SET_RIGHT_PANELS', n);
    obj.$store.commit('SET_NOTICE', n);
    // obj.$store.commit('EDIT_SET_HELP_TYPE', n);
    if (obj.$store.state.Edit.rightPanel === 'server') {
      clinetHelp(obj, [obj.$store.state.System.server, obj.$store.state.System.port], obj.$store.state.System.user.username)
    }
    if (n === 'DRG分析') {
      obj.$store.commit('EDIT_SET_RIGHT_PANELS', n);
      obj.$store.commit('EDIT_SET_HELP_TYPE', n);
      if (obj.$store.state.System.wt4Tables.length > 1) {
        sCompDrg(obj, [obj.$store.state.System.server, obj.$store.state.System.port], obj.$store.state.System.wt4Tables, 'BJ', 'getLocalData')
      } else {
        obj.$store.commit('SET_NOTICE', '请选择分析数据！');
      }
    } else if (n === '编辑器使用帮助' || n === '在线交流') {
      obj.$store.commit('EDIT_SET_RIGHT_PANELS', n);
      obj.$store.commit('EDIT_SET_HELP_TYPE', n);
      obj.$store.commit('SET_NOTICE', n);
      obj.helpType = n
      obj.$store.commit('EDIT_SET_RIGHT_PANEL', 'help');
    } else if (n === '输入框提示') {
      obj.$store.commit('EDIT_SET_RIGHT_PANELS', n);
      obj.$store.commit('EDIT_SET_HELP_TYPE', n);
      obj.$store.commit('EDIT_GET_CDH_FILE', 0);
      if (obj.$store.state.Edit.rightPanel === 'server') {
        if (!obj.$store.state.Edit.rightCdh) {
          obj.$store.commit('SET_NOTICE', '输入提示无内容！');
        } else if (!global.hitbdata.cdh) {
          obj.$store.commit('SET_NOTICE', '输入提示无内容！');
        }
      }
    } else if (n === '病案历史' && obj.$store.state.Edit.rightPanel === 'server') {
      obj.$store.commit('EDIT_SET_RIGHT_PANELS', n);
      obj.$store.commit('EDIT_SET_HELP_TYPE', n);
      getCaseHistory(obj, [obj.$store.state.System.server, obj.$store.state.System.port], obj.$store.state.Edit.doc, obj.$store.state.System.user.username)
    } else if (n === '病案历史' && obj.$store.state.Edit.rightPanel !== 'server') {
      obj.$store.commit('SET_NOTICE', '登陆后可查询病案历史！');
    } else if (n === '病案质控' && obj.$store.state.Edit.rightPanel === 'server') {
      obj.$store.commit('EDIT_SET_RIGHT_PANELS', n);
      obj.$store.commit('EDIT_SET_HELP_TYPE', n);
      if (global.hitbControls.length > 0) {
        const controls = global.hitbControls[0].split(',')
        obj.$store.commit('EDIT_SET_DOC_CONTROL', controls);
      } else {
        obj.$store.commit('SET_NOTICE', '病案质控暂无内容！');
      }
    } else {
      obj.$store.commit('EDIT_SET_RIGHT_PANELS', n);
      obj.$store.commit('EDIT_SET_HELP_TYPE', n);
    }
  }
}

export function editPage(obj, n) {
  if (obj.$store.state.Edit.helpType !== '输入框提示') {
    if (obj.$store.state.Edit.rightType === 'left') {
      let page = 0
      let countPage = 0
      switch (obj.$store.state.Edit.lastNav) {
        case '/library':
          page = obj.$store.state.Library.tablePage
          countPage = obj.$store.state.Library.countPage
          break;
        case '/stat':
          page = obj.$store.state.Stat.tablePage
          countPage = obj.$store.state.Stat.countPage
          break;
        default:
          page = obj.$store.state.Edit.filePage
          break;
      }
      if (page === 1 && n === -1) {
        obj.$store.commit('SET_NOTICE', '当前已是第一页')
      } else if (countPage === page && n === 1 && ['/stat', '/library'].includes(obj.$store.state.Edit.lastNav)) {
        obj.$store.commit('SET_NOTICE', '当前已是尾页');
      } else {
        switch (obj.$store.state.Edit.lastNav) {
          case '/library':
            if (obj.$store.state.Library.tableType === 'server') {
              obj.$store.commit('LIBRARY_TABLE_PAGE', [n]);
              getLibrary(obj, [obj.$store.state.System.server, obj.$store.state.System.port], obj.$store.state.Library.serverTable.tableName, obj.$store.state.Library.tablePage, obj.$store.state.Library.dimensionType, obj.$store.state.Library.dimensionServer, 'edit', 'server', ['asc', '编码'])
            } else {
              obj.$store.commit('LIBRARY_TABLE_PAGE', [n]);
              obj.$store.commit('EDIT_LOAD_FILE', obj.$store.state.Library.localTable)
              obj.$store.commit('SET_NOTICE', `当前${obj.$store.state.Library.tablePage}页,共${obj.$store.state.Library.countPage}页`)
            }
            break;
          case '/stat':
            if (obj.$store.state.Stat.tableType === 'server') {
              obj.$store.commit('STAT_TABLE_PAGE', n);
              getStat(obj, [obj.$store.state.System.server, obj.$store.state.System.port], { tableName: obj.$store.state.Stat.serverTable.tableName, page: obj.$store.state.Stat.tablePage, username: obj.$store.state.System.user.username, type: obj.$store.state.Stat.dimensionType, value: obj.$store.state.Stat.dimensionServer }, 'edit')
            } else {
              obj.$store.commit('STAT_TABLE_PAGE', n);
              obj.$store.commit('SET_NOTICE', `当前${obj.$store.state.Stat.tablePage}页,共${obj.$store.state.Stat.countPage}页`)
            }
            break;
          default:
            obj.$store.commit('EDIT_SET_FILE_PAGE', n);
            obj.$store.commit('SET_NOTICE', '下一页')
            break;
        }
      }
    } else if (obj.$store.state.Edit.rightPanel === 'edit') {
      if (obj.$store.state.Edit.filesPage === 0 && n === -1) {
        obj.$store.commit('SET_NOTICE', '当前已是第一页')
      } else {
        obj.$store.commit('EDIT_SET_FILES_PAGE', n);
        obj.$store.commit('SET_NOTICE', '下一页')
      }
    }
  } else if (obj.$store.state.Edit.helpType === '输入框提示') {
    if (n === -1 && obj.$store.state.Edit.cdhFilePage === 0) {
      obj.$store.commit('SET_NOTICE', '当前已经是第一页')
    } else if (n === +1 && obj.$store.state.Edit.cdhFilePage === obj.$store.state.Edit.cdhFilePagecount) {
      obj.$store.commit('SET_NOTICE', '当前已经最后一页')
    } else {
      obj.$store.commit('EDIT_GET_CDH_FILE', n);
    }
  }
}
