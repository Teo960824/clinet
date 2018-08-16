const fs = require('fs')
const path = require('path');
export default function saveFile(obj, x, p) {
  let dir = global.hitbdata.path.home
  switch (p) {
    case '/edit':
      dir = global.hitbdata.path.user
      break
    case '/stat':
      dir = global.hitbdata.path.stat
      break
    case '/library':
      dir = global.hitbdata.path.library
      break
    case '/system':
      dir = global.hitbdata.path.system
      break
    case '/user':
      dir = global.hitbdata.path.user
      break
    default: break
  }
  if (x && x.endsWith('.csv') && !x.startsWith('cdh')) {
    const fileName = path.format({
      dir: dir,
      base: x
    });
    // const data = obj.$store.state.Edit.file.map(x => x.join(',')).join('\n')
    let data = []
    if (p === '/library') {
      data = obj.$store.state.Library.libraryTable.download.join('\n')
    } else if (p === '/stat') {
      data = obj.$store.state.Stat.downloadTable.join('\n')
    } else if (p === '/user') {
      const fileName = path.format({
        dir: dir,
        base: x.replace('csv', 'cda')
        //  x.splice(0, -3, 'cda')
      });
      const arr = []
      obj.$store.state.Library.libraryTable.download.forEach((x) => {
        arr.push(x[0])
      })
      arr.splice(0, 1)
      const data1 = arr.join('\n')
      // if (data1.length > 0) {
      // console.log(fileName.Substring(0, -3))
      fs.writeFile(fileName, data1, (err) => {
        if (!err) {
          obj.$store.commit('SET_NOTICE', `文件成功保存到「${fileName}」！`)
        }
      })
    } else {
      data = obj.$store.state.Edit.file.join('\n')
    }
    // const data = obj.$store.state.Edit.file.join('\n')
    fs.writeFile(fileName, data, (err) => {
      if (!err) {
        obj.$store.commit('SET_NOTICE', `文件「${x}」保存成功！`)
      }
    })
  } else if (x && x.endsWith('.cda')) {
    const fileName = path.format({
      dir: global.hitbdata.path.user,
      base: x
    });
    const controlName = path.format({
      dir: dir,
      base: '病案质控.cda'
    })
    // const data = obj.$store.state.Edit.file.map(x => `${x},\n`).toString()
    let data = []
    const a = typeof p
    if (a === 'string') {
      data = obj.$store.state.Edit.file.join('\n')
    } else {
      data = p.join('\n')
    }
    // // const data = p.join(',\n')
    // console.log(obj.$store.state.Edit.file);
    // console.log(p);
    if (fileName.includes('未保存病案.cda')) {
      if (obj.$store.state.Edit.rightPanel === 'local') {
        const arr = []
        obj.$store.state.Edit.isSaveLocal.forEach((x) => {
          arr.push(obj.$store.state.Edit.file[x])
        })
        const data1 = arr.join('\n')
        // if (data1.length > 0) {
        fs.writeFile(fileName, data1, (err) => {
          if (!err) {
            obj.$store.commit('SET_NOTICE', `文件成功保存到「${fileName}」！`)
          }
        })
        // }
      }
    } else {
      fs.writeFile(fileName, data, (err) => {
        if (!err) {
          obj.$store.commit('SET_NOTICE', `文件成功保存到「${fileName}」！`)
        }
      })
      const control = obj.$store.state.Edit.docControl.toString()
      fs.writeFile(controlName, control, (err) => {
        if (!err) {
          obj.$store.commit('SET_NOTICE', `文件成功保存到「${controlName}」！`)
        }
      })
    }
  } else if (x && x.startsWith('cdh') && x.endsWith('.csv')) {
    const b = x.split('.')
    const fileName = path.format({
      dir: global.hitbdata.path.library,
      base: `${b[0]}.cdh`
    });

    fs.writeFile(fileName, obj.$store.state.Library.downFile.join('\n').split(',').join(' '), (err) => {
      if (!err) {
        obj.$store.commit('SET_NOTICE', `文件成功保存到「${fileName}」！`)
      }
    })
  } else {
    obj.$store.commit('SET_NOTICE', '请先打开一个本地或者远程的CDA文件！');
    // console.log(x)
    // const fileName = path.format({
    //   dir: dir,
    //   base: `${x}.cda`
    // });
    // // console.log(fileName)
    // if (fs.existsSync(fileName)) {
    //   console.log('今日的CDA文件已经存在！')
    //   obj.$store.commit('SET_NOTICE', '今日的CDA文件已经存在！');
    //   obj.$store.commit('EDIT_SET_FILES_INDEX', 0);
    // } else {
    //   fs.writeFile(fileName, '', (err) => {
    //     if (err) {
    //       console.log(err)
    //     } else {
    //       obj.$store.commit('SET_NOTICE', '今日的CDA文件新建成功！');
    //       obj.$store.commit('EDIT_LOAD_FILES');
    //       obj.$store.commit('EDIT_SET_FILES_INDEX', 0);
    //     }
    //   })
    // }
  }
}

export function unSaveFile(obj, x, p) {
  const fileName = path.format({
    dir: global.hitbdata.path.user,
    base: x
  });
  // const data = obj.$store.state.Edit.file.map(x => `${x},\n`).toString()
  let data = []
  const a = typeof p
  if (a === 'string') {
    data = obj.$store.state.Edit.file.join('\n')
  } else {
    data = p.join('\n')
  }
  // const fileName = '2018年度病案.cda'
  fs.writeFile(fileName, data, (err) => {
    if (!err) {
      obj.$store.commit('SET_NOTICE', `文件成功保存到「${fileName}」！`)
    }
  })
}
