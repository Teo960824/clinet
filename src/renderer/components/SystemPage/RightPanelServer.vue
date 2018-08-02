<template>
  <div>
    <div v-if="this.toolbar === 'getServers'" id="system-server-port">
      <table>
        <tr v-for="(data, index) in file" v-bind:key='index' v-on:click="connect(data, index)" v-bind:class="{'table-danger':flag == index && index !== 0}" class="server-rightpanel-tr" v-bind:id="'system-td-tr'+index">
          <td v-for="(field, index) in data" v-bind:key='index'>{{data[index]}}</td>
        </tr>
      </table>
    </div>
    <!-- 连接服务器状态 -->
    <!-- <div v-if="this.$store.state.System.connectInfo == true" > -->
      <!-- 登录状态 -->
        <!-- 未登录 -->
        <div v-if="this.$store.state.System.user.login == false && this.$store.state.Block.account.address === ''">
          <div v-if="this.toolbar === 'getUsers'">
            <login-register></login-register>
          </div>
        </div>
        <!-- 未登录 -->
        <!-- 已登录 -->
        <div v-else>
          <div v-if="this.toolbar === 'createUsers'">
            <login-register></login-register>
          </div>
          <div v-if="this.toolbar === 'getUsers'">
            <div v-if="this.userInfo === 'info'">
              <get-users></get-users>
            </div>
            <div v-else>
              <form>
                <div class="form-group">
                  <label>新密码</label>
                  <input type="password" class="form-control" placeholder="新密码" v-model="upUserInfo.password">
                  <small class="form-text text-muted">请输入新的密码</small>
                </div>
                <div class="form-group">
                  <label>机构</label>
                  <input type="text" class="form-control" placeholder="新机构" v-model="upUserInfo.org">
                  <small class="form-text text-muted">请输入新的机构</small>
                </div>
              </form>
            </div>
          </div>
          <div v-if="this.toolbar === 'getOrgs'" class ="orgs">
            <get-orgs></get-orgs>
          </div>
          <div v-if="this.toolbar === 'createOrgs'">
            <create-orgs></create-orgs>
          </div>
          <div v-if="this.toolbar === 'createDepartments'">
            <create-departments></create-departments>
          </div>
          <div v-if="this.toolbar === 'getPersons'">
            <get-persons></get-persons>
          </div>
        </div>
        <!-- 已登录 -->
      <!-- 登录状态 -->
    <!-- </div> -->
    <!-- <div v-else>
      请连接服务器
    </div> -->
    <!-- 连接服务器状态 -->
  </div>
</template>

<script>
  import loadFile from '../../utils/LoadFile';
  import GetUsers from './RightPanelServer/GetUsers';
  import GetOrgs from './RightPanelServer/GetOrgs';
  import CreateOrgs from './RightPanelServer/CreateOrgs';
  import LoginRegister from './RightPanelServer/LoginRegister';
  import CreateDepartments from './RightPanelServer/CreateDepartments';
  import GetPersons from './RightPanelServer/GetPersons';
  import { sConnect } from '../../utils/Server'
  export default {
    components: { GetUsers, GetOrgs, CreateOrgs, CreateDepartments, GetPersons, LoginRegister },
    data() {
      return {
        flag: null,
        textPower: '',
        confirmPassword: '',
        userInfo: 'info',

      }
    },
    created: function () {
      loadFile(this, 'hitb_server.csv', 'system')
    },
    computed: {
      file: {
        get() {
          const f = []
          let fileLen = this.$store.state.System.file.length;
          switch (this.$store.state.System.toolbar) {
            case 'getServers':
              if (fileLen > 99) { fileLen = 99 }
              for (let i = 0; i < fileLen; i += 1) {
                f.push(this.$store.state.System.file[i].split(','))
              }
              break;
            case 'getUsers':
              break;
            case 'getOrgs':
              break;
            case 'getPersons':
              break;
            case 'getServerFunctions':
              break;
            default:
              break;
          }
          return f
        }
      },
      toolbar: {
        get() {
          return this.$store.state.System.toolbar
        }
      },
      server: {
        get() {
          return this.$store.state.System.server
        }
      },
      port: {
        get() {
          return this.$store.state.System.port
        }
      },
    },
    methods: {
      connect: function (data, index) {
        this.flag = index
        this.$store.commit('SYSTEM_SET_SERVER', data)
        if (this.toolbar === 'getServers' && index !== 0) {
          sConnect(this, [data[1], data[2]], index)
        }
      },
      // updateUser: function () {
      //   const b = { org: this.upUserInfo.org, password: this.upUserInfo.password }
      //   this.$store.commit('SYSTEM_UPDATE_USER', b)
      // },
    },
  };
</script>

<style scoped>
.orgs{
  margin-top: 0.8em;
}
</style>
