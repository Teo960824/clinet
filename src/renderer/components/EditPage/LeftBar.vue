<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#edit-leftbar-nav" aria-controls="edit-leftbar-nav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="edit-leftbar-nav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" id="edit-leftbar-back" v-on:click="lastNav()" v-if="this.$store.state.Edit.lastNav !== '/edit'">
          <a class="nav-link text-light" href="#"> 返回 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="edit-leftbar-choice" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            {{docType}}
          </a>
          <div class="dropdown-menu" id="edit-leftbar-sel" aria-labelledby="edit-leftbar-choice">
            <a v-for="(data, index) in docTypes" v-bind:key='index' class="dropdown-item" href="#" v-on:click="newDoc(data)"  v-bind:id="'edit-leftbar-'+data">{{data}}</a>
            <div class="dropdown-divider"></div>
          </div>
        </li>
        <li class="nav-item" id="edit-leftbar-newdoc" v-on:click="show()">
          <a class="nav-link text-light" href="#" v-if="this.$store.state.Edit.leftPanel == 'table'">编辑</a>
        </li>
        <li class="nav-item" id="edit-leftbar-cache" v-on:click="saveDoc()">
          <a class="nav-link text-light" href="#">缓存</a>
        </li>
        <li class="nav-item" id="edit-leftbar-newdoc" v-on:click="save('保存病案')">
          <a class="nav-link text-light" href="#">保存</a>
        </li>
        <li class="nav-item" id="edit-leftbar-newdoc" v-on:click="save('保存模板')">
          <a class="nav-link text-light" href="#" v-if="this.$store.state.System.user.login">另存为模板</a>
        </li>
        <!-- <li class="nav-item" id="edit-leftbar-del" v-on:click="save(0)">
          <a class="nav-link text-light" href="#">去除</a>
        </li> -->
        <!-- <li class="nav-item" id="edit-leftbar-preservation" v-on:click="save()" v-if="this.$store.state.Edit.leftPanel == 'table'">
          <a class="nav-link text-light" href="#">保存病案</a>
        </li> -->
        <!-- <li class="nav-item" id="edit-leftbar-preservation" v-on:click="save()" v-if="this.$store.state.Edit.leftPanel == 'table'">
          <a class="nav-link text-light" href="#">保存模板</a>
        </li> -->
        <!-- <li class="nav-item" id="edit-leftbar-save" v-on:click="save(2)" v-if="this.$store.state.Edit.leftPanel == 'table'">
          <a class="nav-link text-light" href="#">另存</a>
        </li> -->
        <li class="nav-item active" id="edit-leftbar-uppage" v-on:click='page(-1)' v-if="this.$store.state.Edit.leftPanel == 'table'">
          <a class="nav-link text-light" href="#"> 前页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" id="edit-leftbar-downpage" v-on:click='page(1)' v-if="this.$store.state.Edit.leftPanel == 'table'">
          <a class="nav-link text-light" href="#"> 后页 <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0" v-on:submit.prevent>
        <input class="form-control mr-sm-2" type="search" placeholder="模糊查询" aria-label="Search" v-on:keyup.enter="leftEnter()" v-model="leftItem">
      </form>
    </div>
  </nav>
</template>

<script>
  import { saveEditDoc, newEditDoc, cacheEditDoc } from '../../utils/EditSave'
  // import { unSaveFile } from '../../utils/SaveFile'
  // import { getDocContent } from '../../utils/EditServerFile'
  import { getStat } from '../../utils/StatServerFile'
  import { getLibrary } from '../../utils/LibraryServerFile';
  export default {
    data() {
      return {
        // name: this.$route.name,
        leftItem: '',
        docType: '自定义文档',
      };
    },
    computed: {
      fileName: {
        get() {
          return this.$store.state.Edit.fileName
        }
      },
      docTypes: {
        get() {
          return this.$store.state.Edit.docTypes
        }
      },
    },
    methods: {
      lastNav: function () {
        this.$router.push(this.$store.state.Edit.lastNav);
        this.$store.commit('EDIT_SET_LAST_NAV', '/edit');
        this.$store.commit('EDIT_SET_FILE');
      },
      show() {
        this.$store.commit('EDIT_SET_LEFT_PANEL', 'doc')
        document.getElementById('edit-editbar-input').focus()
      },
      newDoc: function (n) {
        newEditDoc(this, n)
      },
      page: function (n) {
        let page = 0
        let countPage = 0
        switch (this.$store.state.Edit.lastNav) {
          case '/library':
            page = this.$store.state.Library.tablePage
            countPage = this.$store.state.Library.countPage
            break;
          case '/stat':
            page = this.$store.state.Stat.tablePage
            countPage = this.$store.state.Stat.countPage
            break;
          default:
            page = this.$store.state.Edit.filePage
            break;
        }
        if (page === 1 && n === -1) {
          this.$store.commit('SET_NOTICE', '当前已是第一页')
          this.$store.commit('EDIT_SET_HINT_TYPE', 'notice');
        } else if (countPage === page && n === 1 && ['/stat', '/library'].includes(this.$store.state.Edit.lastNav)) {
          this.$store.commit('SET_NOTICE', '当前已是尾页');
          this.$store.commit('EDIT_SET_HINT_TYPE', 'notice');
        } else {
          switch (this.$store.state.Edit.lastNav) {
            case '/library':
              if (this.$store.state.Library.tableType === 'server') {
                this.$store.commit('LIBRARY_TABLE_PAGE', [n]);
                getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Library.serverTable.tableName, this.$store.state.Library.tablePage, this.$store.state.Library.dimensionType, this.$store.state.Library.dimensionServer, 'edit', ['asc', '编码'])
              } else {
                this.$store.commit('LIBRARY_TABLE_PAGE', [n]);
                this.$store.commit('EDIT_LOAD_FILE', this.$store.state.Library.localTable)
                this.$store.commit('SET_NOTICE', `当前${this.$store.state.Library.tablePage}页,共${this.$store.state.Library.countPage}页`)
                this.$store.commit('EDIT_SET_HINT_TYPE', 'notice');
              }
              break;
            case '/stat':
              if (this.$store.state.Stat.tableType === 'server') {
                this.$store.commit('STAT_TABLE_PAGE', n);
                getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: this.$store.state.Stat.serverTable.tableName, page: this.$store.state.Stat.tablePage, username: this.$store.state.System.user.username, type: this.$store.state.Stat.dimensionType, value: this.$store.state.Stat.dimensionServer }, 'edit')
              } else {
                this.$store.commit('STAT_TABLE_PAGE', n);
                this.$store.commit('SET_NOTICE', `当前${this.$store.state.Stat.tablePage}页,共${this.$store.state.Stat.countPage}页`)
                this.$store.commit('EDIT_SET_HINT_TYPE', 'notice');
              }
              break;
            default:
              this.$store.commit('EDIT_SET_FILE_PAGE', n);
              this.$store.commit('SET_NOTICE', '下一页')
              this.$store.commit('EDIT_SET_HINT_TYPE', 'notice');
              break;
          }
        }
      },
      saveDoc: function () {
        cacheEditDoc(this)
      },
      save: function (data) {
        saveEditDoc(this, data)
        if (this.$store.state.Edit.fileName === '未保存病案.cda') {
          // this.$store.commit('EDIT_ADD_DOC', this.$store.state.Edit.doc.toString());
          // // this.$store.commit('EDIT_ADD_DOC', [this.$store.state.Edit.fileIndex, this.$store.state.Edit.doc.toString()]);
          // unSaveFile(this, '2018年度病案.cda', '/edit')
        }
      },
      leftEnter(e) {
        const doc = this.$store.state.Edit.doc
        const indexArr = []
        doc.map((x) => {
          indexArr.push(x.indexOf(e.target.value))
          const index1 = indexArr.indexOf(0)
          if (index1 > -1) {
            this.$store.commit('EDIT_SEARCH_DOC_INDEX', index1);
            this.$store.commit('SET_NOTICE', '')
          } else {
            this.$store.commit('SET_NOTICE', '未查找到，请输入正确内容！')
            this.$store.commit('EDIT_SET_HINT_TYPE', 'notice');
          }
          return index1
        })
        this.leftItem = ''
      },
    },
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  #edit-leftbar-nav {
    background-image: linear-gradient(to right , #4772fe, #7997fa);
  }
  .nav-link {
    color:#ffffff;
  }
</style>
