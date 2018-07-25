import utils from '../utils';

describe('Edit_1', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Edit_1-测试1', function () {
    this.timeout(100000)
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '系统通知：未注册用户可以直接登陆！使用单机版功能！用户注册可以选择远程服务或者区块链服务！')
    // 2.1、点击数据采集
      .click('#navbar-edit')
      .pause(1000)
      .waitUntilTextExists('#edit-editbar-input', '')
    // 2.1.1、点击编辑并保存
      .click('#edit-leftbar-newdoc1')
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.2.1、点击自定义文档
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-自定义文档')
      .pause(1000)
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        console.log(editText)
        expect(editText).to.equal('系统通知：自定义文档')
      })
      // .waitUntilTextExists('#notice-bar', '自定义文档')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('');
      })
    // 2.2.1.1、前页
      .click('#edit-rightbar-uppage')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：下一页')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('');
      })
    // 2.2.1.2、后页
      .click('#edit-rightbar-downpage')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：下一页')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('');
      })
    // 2.2.1.3、缓存后保存文件
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
      // .waitUntilTextExists('#edit-bar-prompt', '系统通知：文件成功保存到「C:\Users\hitb\clinet-data/\user/\2018年度病案.cda」！')
    // 2.2.2、点击病案首页（卫统四CSV）
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-病案首页（卫统四CSV）')
      .pause(1000)
      .waitUntilTextExists('#edit-bar-prompt', '病案首页（卫统四CSV）')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('');
      })
      // 2.2.2.1、缓存后保存文件
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.2.3、点击入院申请
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-入院申请')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：入院申请')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      // 2.2.3.1、缓存后保存文件
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.2.4、点击首次病程
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-首次病程')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：首次病程')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      // 2.2.4.1、缓存后保存文件
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.2.5、点击病程记录
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-病程记录')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：病程记录')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      // 2.2.5.1、缓存后保存文件
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.2.6、点击病案首页
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-病案首页')
      .getText('#edit-leftpaneldoc-doc')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：病案首页')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      // 2.2.6.1、缓存后保存文件
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.2.7、点击门诊病案
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-门诊病案')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：门诊病案')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      // 2.2.7.1、缓存后保存文件
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
    // 2.2.8、点击健康体检
      .click('#edit-leftbar-choice')
      .click('#edit-leftbar-健康体检')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：健康体检')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      // 2.2.8.1、缓存后保存文件
      .click('#edit-leftbar-cache')
      .click('#edit-leftbar-newdoc2')
  })
});
