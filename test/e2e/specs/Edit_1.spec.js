import utils from '../utils';

describe('Edit_1', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Edit_1-测试1', function () {
    this.timeout(150000)
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
    // 2.3.1、点击编辑器使用帮助
      .click('#edit-rightbar-choice')
      .click('#edit-rightbar-sel')
      // .waitUntilTextExists('#edit-bar-prompt', '系统通知：编辑器使用帮助')
      // .getText('#edit-rightbar-sel')
      // .then(function (editText) {
      //   expect(editText).to.be.an('string');
      // })
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('')
      })
    // 2.3.2、点击输入框提示
      .click('#edit-rightbar-choice')
      .click('#edit-rightbar-输入框提示')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：输入框提示')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('')
      })
      .getText('#edit-rightpanellocal-title')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.3.3、点击病案参考
      .click('#edit-rightbar-choice')
      .click('#edit-rightbar-病案参考')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：病案参考')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('')
      })
    // 2.3.4、点击病案历史
      .click('#edit-rightbar-choice')
      .click('#edit-rightbar-病案历史')
      // .waitUntilTextExists('#notice-bar', '系统通知：病案历史查询失败')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('')
      })
      .getText('#edit-rightpaneldoc-doc')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.3.5、点击在线交流
      .click('#edit-rightbar-choice')
      .click('#edit-rightbar-在线交流')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：在线交流')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('')
      })
    // 2.3.6、点击DRG分析
      .click('#edit-rightbar-choice')
      .click('#edit-rightbar-DRG分析')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：请选择分析数据！')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('')
      })
    // 2.3.7、点击HIS接口
      .click('#edit-rightbar-choice')
      .click('#edit-rightbar-HIS接口')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：HIS接口')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('')
      })
    // 2.3.7、点击病案质控
      .click('#edit-rightbar-choice')
      .click('#edit-rightbar-病案质控')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：病案质控')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('')
      })
    // 2.3.8、点击专家提示
      .click('#edit-rightbar-choice')
      .click('#edit-rightbar-专家提示')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：专家提示')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('')
      })
  })
});
