import utils from '../utils';

describe('Edit_1', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Edit_1-测试1', function () {
    this.timeout(150000)
    // 1.1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '系统通知：未注册用户可以直接登陆！使用单机版功能！用户注册可以选择远程服务或者区块链服务！')
    // 1.2、用户设置-登录
      .click('#navbar-system')
      .click('#navbar-system-server')
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
    // 2.1.1、点击数据采集
      .click('#navbar-edit')
      .pause(1000)
      .waitUntilTextExists('#edit-editbar-input', '')
    // 2.1.2、点击远程
      .click('#edit-rightbar-server')
      .pause(500)
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：读取成功')
    // 2.1.2.1、点击入院纪录_非手术病历
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-入院纪录_非手术病历')
      .pause(500)
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：模板内容查询成功')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string')
      })
      .getText('#edit-leftpaneldoc-doc')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.1.2.2、点击日程记录
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-日程记录')
      .pause(500)
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：模板内容查询成功')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string')
      })
      .getText('#edit-leftpaneldoc-doc')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.1.2.3、点击卫统4_非手术病历
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-卫统4_非手术病历')
      .pause(500)
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：模板内容查询成功')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string')
      })
      .getText('#edit-leftpaneldoc-doc')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.1.2.4、点击入院纪录_手术病历
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-入院纪录_手术病历')
      .pause(500)
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：模板内容查询成功')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string')
      })
      .getText('#edit-leftpaneldoc-doc')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.1.2.5、点击首次病程_1
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-首次病程_1')
      .pause(500)
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：模板内容查询成功')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string')
      })
      .getText('#edit-leftpaneldoc-doc')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.1.2.6、点击永久处方_版本2
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-永久处方_版本2')
      .pause(500)
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：模板内容查询成功')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string')
      })
      .getText('#edit-leftpaneldoc-doc')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.1.2.7、点击入院纪录_默认
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-入院纪录_默认')
      .pause(500)
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：模板内容查询成功')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string')
      })
      .getText('#edit-leftpaneldoc-doc')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.1.2.8、点击入院纪录_死亡病历_默认
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-入院纪录_死亡病历_默认')
      .pause(500)
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：模板内容查询成功')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string')
      })
      .getText('#edit-leftpaneldoc-doc')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.1.2.9、点击入院纪录_死亡病历
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-入院纪录_死亡病历')
      .pause(500)
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：模板内容查询成功')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string')
      })
      .getText('#edit-leftpaneldoc-doc')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.1.2.11、点击永久处方_版本1
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-永久处方_版本1')
      .pause(500)
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：模板内容查询成功')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string')
      })
      .getText('#edit-leftpaneldoc-doc')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.1.2.12、点击首次病程_2
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-首次病程_2')
      .pause(500)
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：模板内容查询成功')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string')
      })
      .getText('#edit-leftpaneldoc-doc')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.1.2.13、点击卫统4_默认
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-卫统4_默认')
      .pause(500)
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：模板内容查询成功')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string')
      })
      .getText('#edit-leftpaneldoc-doc')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.2、点击区块链
      .click('#edit-rightbar-block')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：读取成功')
  })
})
