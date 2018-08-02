<template>
  <div>
    <div v-if="this.toolbar === 'getUsers'">
      <form>
        <div class="form-group">
          <label class="">用户名（远程服务用户是电子邮箱，区块链服务用户是12个单词组成的口令）</label>
          <input type="text" class="form-control" placeholder="用户名(邮箱)" v-model="emailorname" id="server-username" @input="userLogins()">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">用户密码（区块链服务用户没有密码，或者使用二级密码）</label>
          <input type="password" class="form-control" placeholder="密码" v-model="loginpassword" id="server-password" @input="userLogins()">
        </div>
        <div class="form-group" v-if="this.secondPassword">
          <label for="exampleInputPassword1">确认密码</label>
          <input type="password" class="form-control" placeholder="密码" v-model="confirmPassword" id="server-password" @input="userLogins()">
        </div>
      </form>
      <button id="server-login" type="button" class="btn btn-outline-primary" v-on:click="sysytemlogin()"  v-if="!this.secondPassword">登录(可使用用户账号登录和区块链账号登录)</button>
      <button id="server-regiest" type="button" class="btn btn-outline-primary" v-on:click="sysytemRegisters()"  v-if="!this.secondPassword">注册</button>
      <button id="server-again-regiest" type="button" class="btn btn-outline-primary" v-on:click="sysytemRegister()"  v-if="this.secondPassword">确认注册</button>
      <button id="server-login-return" type="button" class="btn btn-outline-primary" v-on:click="sysytemRegisters()"  v-if="this.secondPassword">返回</button>
    </div>
    <div v-if="this.toolbar === 'createUsers'">
      <div>
        <form>
          <div class="form-group">
            <label for="InputEmail">用户注册的Email地址</label>
            <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" @input="register()">
          </div>
          <div class="form-group">
            <label for="InputPassword">新用户密码</label>
            <input type="password" class="form-control" id="InputPassword" placeholder="Password" v-model="password" @input="register()">
          </div>
          <div class="form-group">
            <label for="InputOrg">机构</label>
            <input type="text" class="form-control" id="InputOrg" placeholder="InputOrg" v-model="org" @input="register()">
          </div>
          <div class="form-group">
            <label for="InputAge">年龄</label>
            <input type="number" class="form-control" id="InputAge" placeholder="Age" v-model="age" @input="register()">
          </div>
          <div class="form-group">
            <label for="InputTel">电话</label>
            <input type="text" class="form-control" id="InputTel" placeholder="Tel" v-model="tel" @input="register()">
          </div>
          <div class="form-group">
            <label for="InputPersonname">姓名</label>
            <input type="text" class="form-control" id="InputPersonname" placeholder="Personname" v-model="personname" @input="register()">
          </div>
        </form>
        <button id="server-login-1" type="button" class="btn btn-outline-primary" v-on:click="sysytemUpdate()">确认修改</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { sRegister, sUpdateUser } from '../../../utils/ServerUser'
  import { socketConnect } from '../../../utils/Socket';
  export default {
    data() {
      return {
        emailorname: 'test@hitb.com.cn',
        loginpassword: '123456',
        confirmPassword: '',
        secondPassword: false,
        reg: /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g,
        upUserInfo: { org: this.$store.state.System.user.org, password: '' },
        email: '',
        password: '',
        org: '',
        age: '',
        tel: '',
        personname: ''
      }
    },
    computed: {
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
      userLogins: function () {
        const b = { username: this.emailorname, password: this.loginpassword }
        this.$store.commit('SYSTEM_LOGIN_USER', b)
      },
      sysytemlogin: function () {
        const user = this.$store.state.System.userLogin
        if (this.reg.test(user.username)) {
          this.$store.commit('SYSTEM_SET_SERVER', this.$store.state.System.file[1].split(','))
          socketConnect(this, [this.server, this.port], { username: user.username, password: user.password });
        }
      },
      sysytemRegisters: function () {
        if (this.secondPassword === false) {
          this.secondPassword = true
        } else {
          this.secondPassword = false
        }
      },
      sysytemRegister: function () {
        this.$store.commit('SYSTEM_SET_SERVER', this.$store.state.System.file[1].split(','))
        // 邮箱,密码,年龄.电话
        let a = 1;
        if (this.reg.test(this.emailorname)) {
          a = 1
        } else {
          a = 0
          this.$store.commit('SET_NOTICE', '用户名或邮箱输入错误');
        }
        if (a === 1) {
          if (this.loginpassword === this.confirmPassword) {
            const user = { username: this.emailorname, password: this.loginpassword, org: '测试医院1', age: '26', tel: '15611756970', email: this.emailorname, name: 'test', type: 2 }
            sRegister(this, [this.server, this.port], user)
            this.secondPassword = false
          }
        }
      },
      register: function () {
        const user = { username: this.email, password: this.password, org: this.org, age: this.age, tel: this.tel, email: this.email, name: this.personname, type: 2 }
        this.$store.commit('SYSTEM_REGISTER_USER', user)
      },
      sysytemUpdate: function () {
        sUpdateUser(this, [this.server, this.port], this.$store.state.System.user.id, this.$store.state.System.registerInfo)
      },
    }
  };
</script>
