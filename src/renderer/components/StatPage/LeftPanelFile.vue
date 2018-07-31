<template>
  <div style="height:400px; overflow-y:auto;">
    <table id="stat-left-file-table">
      <tr>
        <th id="stat-left-file-th" class="table-danger"> 数据分析文件</th>
      </tr>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="loadFile(data, index)" v-bind:class="{'table-danger':flag === index}" v-bind:id="'stat-left-file-tr'+index">
        <td>{{data}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import loadFile from '../../utils/LoadFile';
  // import chartLine from '../../utils/ChartLine';
  // import chartBar from '../../utils/ChartBar';
  import { getStatFiles, getStat } from '../../utils/StatServerFile'
  // import { sGetWt4 } from '../../utils/Server'
  export default {
    data() {
      return {
        // flag: null
      };
    },
    computed: {
      flag: {
        get() {
          let flag = []
          flag = this.$store.state.Stat.fileIndex.first
          return flag
        }
      },
      xs: {
        get() {
          let xs = []
          if (this.$store.state.Stat.isServer) {
            xs = this.$store.state.Stat.serverMenu.first
          } else {
            xs = this.$store.state.Stat.files
          }
          return xs
        }
      },
    },
    methods: {
      loadFile: function (data, index) {
        // 设置文件高亮
        this.$store.commit('STAT_SET_FILE_INDEX', ['first', index]);
        // 判断读取文件
        if (this.$store.state.Stat.tableType === 'local') {
          loadFile(this, data, 'stat');
        } else if (this.$store.state.Stat.tableType === 'server' || this.$store.state.Stat.isServer) {
          this.$store.commit('STAT_SET_TABLE_TYPE', 'server')
          // 判断是否是病案
          if (data.endsWith('.csv')) {
            this.$store.commit('STAT_SET_CHART_IS_SHOW', 'chart');
            getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: data, page: 1, username: this.$store.state.System.user.username, dimension: this.$store.state.Stat.dimension, order: this.$store.state.Stat.tableSort }, 'stat')
          } else {
            if (this.$store.state.Stat.serverMenu.type === '二级菜单') {
              this.$store.commit('STAT_SET_SERVER_MENU', ['三级菜单', []]);
            }
            this.$store.commit('STAT_SET_CHART_IS_SHOW', 'menu');
            getStatFiles(this, [this.$store.state.System.server, this.$store.state.System.port], data, this.$store.state.System.user.username, this.$store.state.Stat.tableType)
          }
        }
      },
    },
  };
</script>

<style scoped>

</style>
