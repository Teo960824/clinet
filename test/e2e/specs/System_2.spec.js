import utils from '../utils';

describe('System_2', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('System-测试2', function () {
    this.timeout(38000);
    // 1.点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '系统通知：未注册用户可以直接登陆！使用单机版功能！用户注册可以选择远程服务或者区块链服务！')
    // 2.1、点击系统服务-本地文件导入
      .click('#navbar-system')
      .click('#navbar-system-local')
      .getHTML('.server-leftpanel')
      .then(function (leftpanel) {
        expect(leftpanel).to.be.an('array');
      })
    // 2.1.1、点击左侧列表，读取文件，底部提示显示csv文件读取成功！
      .click('.server-leftpanel')
      .waitUntilTextExists('#notice-bar', 'CSV文件读取成功！')
      .getText('.server-load-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
    // 2.2、点击选择数据表
      .click('#server-load-choosedb')
      .getText('.server-leftpanel')
      .then(function (leftpanel) {
        expect(leftpanel).to.be.an('array');
      })
    // 2.2.1、选择左侧列表，读取文件，底部显示数据表读取成功！
      .click('.server-leftpanel')
      .waitUntilTextExists('#notice-bar', '数据表读取成功！')
      .getText('.server-load-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
    // 2.3、点击对照数据，点击右侧左侧数据进行对照
      .click('#server-load-contrast')
      .click('.server-load-rightpanel-tr')
      .click('.server-leftpanel')
      .getText('.server-load-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
    // 2.4、点击检验数据，底部显示数据校验成功
      .click('#server-load-checkdata')
      .getText('.server-load-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
      .waitUntilTextExists('#notice-bar', '数据校验成功')
      // 2.6.1、点击前页
      .click('#server-load-uppage')
      .getText('.server-load-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
      // 2.6.1、点击后页
      .click('#server-load-downpage')
      .getText('.server-load-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
      // 2.6.1、点击左页
      .click('#server-load-leftpage')
      .getText('.server-load-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
      // 2.6.1、点击右页
      .click('#server-load-rightpage')
      .getText('.server-load-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
    // 2.5、点击编辑数据，跳转到编辑数据页面
      .click('#server-load-editdata')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('')
      })
      .click('#edit-leftbar-back')
      // 2.6、点击上传服务器数据
      .click('#server-load-uploaddata')
  })
});
