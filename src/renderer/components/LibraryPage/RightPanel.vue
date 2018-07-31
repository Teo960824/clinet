<template>
  <div>
    <right-bar></right-bar>
    <div v-bind:style="{ height: height + 'px', overflow: 'auto' }">
      <table>
        <tr v-for="(x, index) in xs"  v-if="index === 0" v-on:click="onClick(x, index)" v-bind:key="index" class="library-rightpanel">
          <th class="text-center" v-for="(data, xindex) in x" v-bind:key="xindex" v-if="tableType === 'local' || tableType === 'block'">
            {{data}}
          </th>
          <th class="text-center" v-for="(data, xindex) in x" v-bind:key="xindex" v-if="tableType === 'server'">
            <a class="oi oi-sort-ascending" v-if="serverSort.type === 'asc' && serverSort.field == data" ></a>
            <a class="oi oi-sort-ascending" href="#" v-else style="color:#7bb8d1" v-on:click="onClickSort(data, 'asc')" v-bind:id="'library-table-asc'+xindex"></a>
            &nbsp;&nbsp;&nbsp;&nbsp;{{data}}&nbsp;&nbsp;&nbsp;&nbsp;
            <a class="oi oi-sort-descending"  v-if="serverSort.type === 'desc' && serverSort.field == data"></a>
            <a class="oi oi-sort-descending" href="#" v-else style="color:#7bb8d1" v-on:click="onClickSort(data, 'desc')" v-bind:id="'library-table-desc'+xindex"></a>
          </th>
        </tr>
        <tr v-for="(data, index) in xs" v-bind:key='index' class="library-right-table-tr" v-if="index > 0">
          <td v-for="(field, index) in data"  v-bind:key='index' class="library-right-table-td"  v-if="index < 11">{{data[index]}}</td>
        </tr>
      </table>
      <nav aria-label="Page navigation example" v-if="this.$store.state.Library.tableType === 'server'">
        <ul class="pagination">
          <li class="page-item" v-for= "(value, index) in page.pageList" v-bind:key="index" v-bind:class="{'disabled':value.page == page.page}" v-on:click="serverPage(value.page)"><a class="page-link" href="#">
            {{value.num}}
          </a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  import RightBar from './RightBar';
  import { getLibrary } from '../../utils/LibraryServerFile'
  export default {
    components: { RightBar },
    data() {
      return {
        // flag: null
        height: 0
      };
    },
    created: function () {
      this.height = document.body.clientHeight - 100
    },
    computed: {
      page: {
        get() {
          return { pageList: this.$store.state.Library.libraryTableInfo.pageList, page: this.$store.state.Library.libraryTableInfo.page }
        }
      },
      serverSort: {
        get() {
          return this.$store.state.Library.serverSort
        }
      },
      xs: {
        get() {
          const table = this.$store.state.Library.libraryTable.data
          // switch (this.$store.state.Library.tableType) {
          //   case 'local': {
          //     table = this.$store.state.Library.localTable;
          //     break;
          //   }
          //   case 'server': {
          //     table = this.$store.state.Library.serverTable.data
          //     break;
          //   }
          //   case 'block': {
          //     table = this.$store.state.Library.serverTable.data
          //     break;
          //   }
          //   default: {
          //     break;
          //   }
          // }
          return table
        }
      },
      rowHeight: {
        get() {
          return this.$store.state.Library.rowHeight
        }
      },
      fieldIndex: {
        get() {
          return this.$store.state.Library.fieldIndex
        }
      },
      tableType: {
        get() {
          return this.$store.state.Library.tableType
        }
      }
    },
    methods: {
      onClick: function (data, index) {
        this.$store.commit('LIBRARY_GET_ROW', index);
        this.$store.commit('LIBRARY_GET_FIELD', data);
        if (this.$store.state.Library.tableType === 'server') {
          this.$store.commit('LIBRARY_GET_FIELD_INDEX', index);
        }
      },
      serverPage: function (data) {
        const page = parseInt(data, 10)
        this.$store.commit('LIBRARY_SET_TABLE_PAGE', page);
        getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Library.libraryTableInfo.tableName, page, this.$store.state.Library.dimensionType, this.$store.state.Library.dimensionServer, 'library', this.$store.state.Library.tableType, this.$store.state.Library.serverSort)
        // getLibrary(obj, data, tableName, pageNum, dimensionType, dimensionServer, type1, serverType = 'server'
      },
      sort: function (type, value) {
        getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Library.libraryTableInfo.tableName, 1, 'filter', this.$store.state.Library.serverDimension, 'library', this.$store.state.Library.tableType, [type, value])
      },
      onClickSort: function (field, type) {
        this.$store.commit('LIBRARY_SET_SERVER_SORT', [field, type])
        getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Library.libraryTableInfo.tableName, 1, 'filter', this.$store.state.Library.serverDimension, 'library', this.$store.state.Library.tableType, this.$store.state.Library.serverSort)
      }
    },
  };
</script>

<style scoped>

</style>
