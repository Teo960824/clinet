import utils from '../utils';

describe('System_1', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('System-测试1', function () {
    this.timeout(38000);
    // 1.点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '系统通知：未注册用户可以直接登陆！使用单机版功能！用户注册可以选择远程服务或者区块链服务！')
    // 2.1、点击远程服务器列表，显示远程服务器列表表格
      .click('#navbar-system')
      .click('#navbar-system-server')
      .click('#server-remote-list')
    // .waitUntilTextExists('#notice-bar', 'CSV文件读取成功！')
      // .getHTML('#system-server-port')
      // .then(function (value) {
      //   console.log(value)
      // })
      .pause(1000)
    // 2.2、点击远程测试服务器，等待底部通知框出现'连接成功'
      .click('#system-td-tr1')
      // .waitUntilTextExists('#notice-bar', '系统通知：连接成功')

    // 2.3、用户设置-登录
      .click('#server-user-setup')
      // .waitUntilTextExists('#notice-bar', '用户设置')
      .setValue('#server-username', 'test5@hitb.com.cn')
      .setValue('#server-password', '123456')
      .click('#server-login')
      .pause(1000)
      .getText('#navbar-username')
      .then(function (value) {
        console.log(value)
        expect(value).to.equal('    你好, test5@hitb.com.cn      ')
      })
      // .waitUntilTextExists('#notice-bar', '系统通知：远程服务用户登录成功')
    // 2.4、点击修改用户
      .click('#server-user-change')
      // .click('#server-user-ischange')
      .setValue('#InputEmail', '1072@qq.com')
      .setValue('#InputPassword', '123456')
      .setValue('#InputOrg', 'jjj')
      .setValue('#InputAge', '18')
      .setValue('#InputTel', '13562519503')
      .setValue('#InputPersonname', 'xdd')
      .click('#server-login-1')
      .pause(1000)
      .getText('#navbar-username')
      .then(function (value) {
        console.log(value)
        expect(value).to.equal('    你好, 1072@qq.com      ')
      })
      .click('#server-user-setup')
      .click('#server-user-change')
      .setValue('#InputEmail', 'test5@hitb.com.cn')
      .setValue('#InputPassword', '123456')
      .setValue('#InputOrg', 'jjj')
      .setValue('#InputAge', '18')
      .setValue('#InputTel', '13562519503')
      .setValue('#InputPersonname', 'xddd')
      .click('#server-login-1')
      .pause(1000)
      .getText('#navbar-username')
      .then(function (value) {
        console.log(value)
        expect(value).to.equal('    你好, test5@hitb.com.cn      ')
      })
      // 2.5、机构信息与科室信息
      .click('#server-user-setup')
      .click('#server-user-changepower')
      .click('#server-org-setup')
      .click('#server-org-setup')
      // 2.6、点击机构信息，新建机构并添加机构
      .click('#orgInfos1')
      .waitUntilTextExists('#notice-bar', '系统通知：机构设置')
      .click('#server-user-neworg')
      .setValue('#InputOrgCode', '123456')
      .setValue('#InputOrgName', '123456')
      .setValue('#InputOrgLevel', '123456')
      .setValue('#InputOrgType', '123456')
      .click('#InputOrgProvince')
      .click('#server-org-province-tr0')
      .click('#InputOrgCity')
      .click('#server-org-city-tr0')
      .click('#InputOrgCity')
      .click('#server-org-county-tr0')
      .setValue('#InputOrgPerson_name', '123456')
      .setValue('#InputOrgTel', '13562519503')
      .setValue('#InputOrgEmail', '1072@qq.com')
      .click('#server-user-addorg')
      .pause(1000)
      .click('#server-org-setup')
      // 2.7、点击科室信息，新建科室并添加
      .click('#orgInfos2')
      .click('#newsection')
      .setValue('#system_department_name', '123')
      .setValue('#system_department_director', '123')
      .setValue('#system_department_class', '123')
      .setValue('#system_department_affiliated', '123')
      // .setValue('#system_department_improt1', 'checked')
      // .setValue('#system_department_characteristic1', 'checked')
      .setValue('#system_department_Deputy', '123')
      .setValue('#system_department_coding', '123')
      .setValue('#system_department_name1', '123')
      .click('#addsection')
      .pause(1000)
      .getText('#notice-bar')
      .then(function (value) {
        console.log(value)
        expect(value).to.equal('系统通知：科室创建成功')
      })
      .click('#sever-help-section')
  })
})
