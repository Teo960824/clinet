const fs = require('fs');

const state = {
  files: [],
  file: [],
  table: [],
  tableSel: [],
  localTables: [],
  leftPanel: 'file',
  dimension: [],
  dimensionType: null,
  dimensionOrg: [],
  dimensionTime: [],
  dimensionVersion: [],
  field: '',
  fieldIndex: [],
  fileIndex: null,
  tableType: 'local',
  serverTable: { page: 1, countPage: 0, data: [], pageList: [], tableName: '' },
  dimensionSearch: { time: 0, version: 0, org: 0 },
  rowHeight: null,
  dimensionServer: '',
  fileTypes: ['本地', '远程', '区块链'],
  dropdownTypes: ['年份', '版本', '全部'],
  libraryList: { org: [], time: [], version: [] },
  serverDimension: { org: '', time: '', version: '' },
  libraryTable: { data: [], download: [] },
  serverSort: { field: '编码', type: 'asc' },
  libraryTableInfo: { page: 1, countPage: 0, pageList: [], tableName: '', header: [], title: [] },
  compRule: {},
};

const mutations = {
  LIBRARY_LOAD_FILES() {
    state.files = fs.readdirSync(global.hitbdata.path.library).filter(x => x.endsWith('.csv'))
  },
  LIBRARY_LOAD_FILE(state, message) {
    state.file = message;
    state.table = message.map(x => x.split(','))
    state.libraryTableInfo.header = state.table.slice(0, 1)
    state.tableSel = state.table
    state.tableSel.splice(0, 1)
    let time = null
    let version = null
    let org = null
    state.dimensionOrg = [...new Set(state.table.map(a => a[org]))]
    if (state.libraryTableInfo.header[0].includes('year')) {
      time = state.libraryTableInfo.header[0].indexOf('year')
      version = state.libraryTableInfo.header[0].indexOf('version')
      org = state.libraryTableInfo.header[0].indexOf('org')
    } else if (state.libraryTableInfo.header[0].includes('年份')) {
      time = state.libraryTableInfo.header[0].indexOf('年份')
      version = state.libraryTableInfo.header[0].indexOf('版本')
      org = state.libraryTableInfo.header[0].indexOf('机构')
    }
    state.dimensionSearch.time = time
    state.dimensionSearch.version = version
    state.dimensionSearch.org = org
    state.dimensionOrg = [...new Set(state.table.map(a => a[org]))]
    state.dimensionTime = [...new Set(state.table.map(a => a[time]))]
    state.dimensionVersion = [...new Set(state.table.map(a => a[version]))]
    state.notice = [
      `术语总数：${state.tableSel.length - 1}`,
      `机构总数：${state.dimensionOrg.length - 1}`,
      `时间维度总数：${state.dimensionTime.length - 1}`,
      `版本维度总数：${state.dimensionVersion.length - 1}`,
    ]
    state.tablePage = 1;
    const page = Math.ceil(state.tableSel.length / 35)
    state.countPage = page
    for (let i = 1; i <= page; i += 1) {
      const f = []
      f.push(state.libraryTableInfo.header[0])
      for (let j = 1; j <= 35; j += 1) {
        f.push(state.tableSel[(i) * j])
      }
      state.localTables[i] = f
    }
    state.libraryTable.data = state.localTables[state.tablePage]
  },
  LIBRARY_SERVER_FILES(state, opt) {
    state.files = opt.data;
  },
  LIBRARY_TABLE_PAGE(state, m) {
    if (m[1]) {
      state.libraryTableInfo.page = 1;
    } else {
      state.libraryTableInfo.page += m[0];
    }
    const page = Math.ceil(state.tableSel.length / 35)
    if (state.libraryTableInfo.page > page && state.tableType !== 'server') {
      state.libraryTableInfo.page = page
    } else if (state.libraryTableInfo.page < 1) {
      state.libraryTableInfo.page = 1
    }
    // .slice(1)
    if (state.localTables[state.libraryTableInfo.page] !== undefined) {
      state.libraryTable.data = state.localTables[state.libraryTableInfo.page]
    }
    // console.log(state.localTables[state.libraryTableInfo.page])
    // state.libraryTable.data = state.localTables[state.libraryTableInfo.page]
  },
  LIBRARY_SET_TABLE_INFO(state, opt) {
    state.libraryTableInfo = opt
  },
  LIBRARY_SET_LIBRARY_LIST(state, data) {
    state.libraryList = data
  },
  // STAT_CLEAR_SERVER_DIMENSION(state, value) {
  //   state.serverDimension[value[1]] = value[0]
  //   console.log(state.serverDimension)
  // },
  LIBRARY_SET_SERVER_DIMENSION(state, opt) {
    switch (opt[1]) {
      case 'org':
        state.serverDimension.org = opt[0]
        break;
      case 'time':
        state.serverDimension.year = opt[0]
        break;
      case 'version':
        state.serverDimension.version = opt[0]
        break;
      default:
        break;
    }
  },
  LIBRARY_SET_TABLE_PAGE(state, page) {
    state.libraryTableInfo.page = page;
  },
  LIBRARY_SET_LEFT_PANEL(state, opt) {
    if (state.tableType === 'local') {
      state.leftPanel = opt[0];
      state.dimensionType = opt[1];
      switch (opt[1]) {
        case 'org':
          state.dimension = state.dimensionOrg
          break;
        case 'year':
          state.dimension = state.dimensionTime
          break;
        case 'version':
          state.dimension = state.dimensionVersion
          break;
        default:
          break;
      }
    } else {
      state.leftPanel = opt[0];
      state.dimensionType = opt[1];
      state.dimension = opt[2];
    }
  },
  LIBRARY_SET_DIMENSION(state, opt) {
    switch (opt[0]) {
      case 'org':
        // state.dimensionOrg.push(opt[1])
        // console.log(opt)
        state.tableSel = state.table.filter(x => x[0] === opt[1])
        break;
      case 'year':
        state.tableSel = state.table.filter(x => x[state.dimensionSearch.time] === opt[1])
        break;
      case 'version':
        // console.log(opt)
        // state.dimensionDrg.push(opt[1])
        state.tableSel = state.table.filter(x => x[state.dimensionSearch.version] === opt[1])
        break;
      default:
        state.dimensionOrg = []
        state.dimensionTime = []
        state.dimensionVersion = []
        break;
    }
    state.notice = [
      `术语总数：${state.tableSel.length - 1}`
    ]
    const page = Math.ceil(state.tableSel.length / 35)
    state.countPage = page
    for (let i = 1; i <= page; i += 1) {
      const f = []
      f.push(state.ibraryTableInfo.header[0])
      for (let j = 1; j <= 35; j += 1) {
        f.push(state.tableSel[(i) * j])
      }
      state.localTables[i] = f
    }
    state.tablePage = 1
    state.libraryTable.data = state.localTables[state.tablePage].slice(1)
  },
  LIBRARY_GET_FIELD(state, field) {
    state.field = field;
  },
  LIBRARY_SET_SERVER_SORT(state, opt) {
    state.serverSort.field = opt[0]
    state.serverSort.type = opt[1]
  },
  LIBRARY_CLEAR_SERVER_SORT(state) {
    state.serverSort = { field: '编码', type: 'asc' }
  },
  LIBRARY_GET_FIELD_INDEX(state, index) {
    if (state.fieldIndex.includes(index)) {
      state.fieldIndex.splice(state.fieldIndex.findIndex(v => v === index), 1)
    } else {
      state.fieldIndex = [...state.fieldIndex, index]
    }
  },
  LIBRARY_SET_FILE_INDEX(state, index) {
    state.fileIndex = index;
  },
  LIBRARY_SET_TABLE_TYPE(state, index) {
    state.tableType = index;
  },
  LIBRARY_SET_SERVER_TABLE(state, opt) {
    state.libraryTable.data = opt
  },
  LIBRARY_GET_SEARCH_TABLE(state, data) {
    state.localTables = {}
    const a = state.tableSel.filter(n => n.includes(data));
    const page = Math.ceil(a.length / 35)
    state.countPage = page
    for (let i = 1; i < page; i += 1) {
      const f = []
      f.push(state.ibraryTableInfo.header[0])
      for (let j = 1; j <= 35; j += 1) {
        f.push(a[(i) * j])
      }
      state.localTables[i] = f
    }
    state.libraryTable.data = state.localTables[state.tablePage].slice(1)
  },
  LIBRARY_GET_ROW(state, data) {
    state.rowHeight = data
  },
  LIBRARY_SET_COUNT_PAGE(state, n) {
    state.countPage = n
  },
  LIBRARY_SET_FILE_TYPES(state, value) {
    state.fileTypes = value
  },
  LIBRARY_SET_DROPDOWN_TYPES(state, value) {
    state.dropdownTypes = value
  },
  LIBRARY_GET_DOWN_FILE(state, value) {
    state.libraryTable.download = value
  },
  LIBRARY_SET_SERVER_DIMENSIONS(state, value) {
    state.dimensions = value
  },
  LIBRARY_SET_COMP_RULE(state, value) {
    state.compRule = value
  },
};

const actions = {
  someAsyncTask({ commit }) {
    commit('LIBRARY_LOAD_FILES');
    commit('LIBRARY_LOAD_FILE');
    commit('LIBRARY_SERVER_FILES');
    commit('LIBRARY_TABLE_PAGE');
    commit('LIBRARY_SET_LEFT_PANEL');
    commit('LIBRARY_SET_DIMENSION');
    commit('LIBRARY_GET_FIELD');
    commit('LIBRARY_GET_FIELD_INDEX');
    commit('LIBRARY_SET_FILE_INDEX');
    commit('LIBRARY_SET_TABLE_TYPE');
    commit('LIBRARY_GET_SEARCH_TABLE');
    commit('LIBRARY_GET_ROW');
    commit('LIBRARY_SET_TABLE_PAGE');
    commit('LIBRARY_SET_SERVER_DIMENSION');
    commit('LIBRARY_SET_COUNT_PAGE');
    commit('LIBRARY_SET_SERVER_TABLE_TITLE');
    commit('LIBRARY_SET_FILE_TYPES');
    commit('LIBRARY_SET_DROPDOWN_TYPES');
    commit('LIBRARY_GET_DOWN_FILE');
    commit('LIBRARY_SET_SERVER_DIMENSIONS');
    commit('LIBRARY_SET_LIBRARY_LIST');
    commit('STAT_CLEAR_SERVER_DIMENSION');
    commit('LIBRARY_SET_TABLE_INFO');
    commit('LIBRARY_CLEAR_SERVER_SORT');
    commit('LIBRARY_SET_COMP_RULE');
  },
};

export default {
  state,
  mutations,
  actions,
};
