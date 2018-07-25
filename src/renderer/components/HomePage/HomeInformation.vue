<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <div class="row" style="background-color:white;padding:1rem;height:40rem">
          <!-- <div class="col-md-7" id="homechart" style="height:28rem">
          </div> -->
          <div class="col-md-12" style="padding-top:2rem;">
            <table class="table table-bordered" style="min-height:10px;" >
              <thead>
                <tr>
                  <th>待办事项</th>
                  <th>待办时间</th>
                  <th>紧急程度</th>
                </tr>
              </thead>
              <tbody>
                <tr class="alert alert-danger">
                  <td>待办事项1</td>
                  <td>2018-7-17 16:41:09</td>
                  <td>紧急待办</td>
                </tr>
                <tr class="alert alert-warning">
                  <td>待办事项2</td>
                  <td>2018-7-16 16:40:37</td>
                  <td>优先待办</td>
                </tr>
                <tr class="alert alert-success">
                  <td>待办事项3</td>
                  <td>2018-7-16 16:40:45</td>
                  <td>普通待办</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style="background-color:white;padding:3rem;height:50rem">
          <p class="h3">使用流程</p>
          <div style="height:5rem">
            <ul class="breadcrumb">
              <li>
                  <a href="#">数据采集</a> <span class="divider">></span>
              </li>
              <li>
                  <a href="#">新建自定义文档</a> <span class="divider">></span>
              </li>
              <li class="active">查询历史病历</li>
            </ul>
          </div>
          <div style="height:5rem">
            <ul class="breadcrumb">
              <li>
                <a href="#">数据分析</a> <span class="divider">></span>
              </li>
              <li>
                <a href="#">表格展示</a> <span class="divider">></span>
              </li>
              <li class="active">图表分析</li>
            </ul>
          </div>
          <div style="height:5rem">
            <ul class="breadcrumb">
              <li>
                <a href="#">术语字典</a> <span class="divider">></span>
              </li>
              <li>
                <a href="#">表格展示</a> <span class="divider"></span>
              </li>
              <li class="active"></li>
            </ul>
          </div>
          <div style="height:5rem">
            <ul class="breadcrumb">
              <li>
                <a href="#"></a>系统服务<span class="divider">></span>
              </li>
              <li>
                <a href="#"></a>分组服务<span class="divider">></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-6" style="height:90rem;background-color:white">
        <div role="alert">
          <h3 class="alert-heading" style="padding: 0">住院病历</h3>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <span style="marginRight: 10px"><b>入院记录</b></span>
            </ol>
          </nav>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <span style="marginRight: 10px"><b>病程记录</b></span>
              <li v-for="(data, index) in bcRecord" class="breadcrumb-item active" aria-current="page" v-bind:key="index"><a href="#">{{data}}</a></li>
            </ol>
          </nav>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <span style="marginRight: 10px"><b>围术期相关记录</b></span>
              <li v-for="(data, index) in wsqRecord" class="breadcrumb-item active" aria-current="page" v-bind:key="index"><a href="#">{{data}}</a></li>
            </ol>
          </nav>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <span style="marginRight: 10px"><b>出院（死亡）记录</b></span>
              <li v-for="(data, index) in cyRecord" class="breadcrumb-item active" aria-current="page" v-bind:key="index"><a href="#">{{data}}</a></li>
            </ol>
          </nav>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <span style="marginRight: 10px"><b>护理相关记录</b></span>
              <li v-for="(data, index) in hlRecord" class="breadcrumb-item active" aria-current="page" v-bind:key="index"><a href="#">{{data}}</a></li>
            </ol>
          </nav>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <span style="marginRight: 10px"><b>知情同意书</b></span>
              <li v-for="(data, index) in zqRecord" class="breadcrumb-item active" aria-current="page" v-bind:key="index"><a href="#">{{data}}</a></li>
            </ol>
          </nav>
        </div>
        <div role="alert">
          <h3 class="alert-heading" style="padding: 0">门诊病历</h3>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <span style="marginRight: 10px"></span>
              <li v-for="(data, index) in mzRecord" class="breadcrumb-item active" aria-current="page" v-bind:key="index"><a href="#">{{data}}</a></li>
            </ol>
          </nav>
        </div>
        <div role="alert">
          <h3 class="alert-heading" style="padding: 0">健康体检</h3>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <span style="marginRight: 10px"></span>
              <li class="breadcrumb-item active" aria-current="page"><a href="#">体检报告</a></li>
            </ol>
          </nav>
        </div>
        <div role="alert">
          <h3 class="alert-heading" style="padding: 0">特殊病历</h3>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <span style="marginRight: 10px"></span>
              <li v-for="(data, index) in tsRecord" class="breadcrumb-item active" aria-current="page" v-bind:key="index"><a href="#">{{data}}</a></li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  // import LeftBar from '../EditPage/LeftBar';
  // export default {
  //   data() {
  //     return {
  //       name: this.$route.name,
  //       bcRecord: ['首次病程记录', '日常病程记录', '上级医师首次查房记录', '会诊记录', '疑难危重比管理讨论记录', '交接班记录', '转科记录', '有创诊疗操作病例'],
  //       wsqRecord: ['术前小结', '术前讨论', '麻醉术前访视记录', '麻醉记录', '手术记录', '手术安全检查记录', '手术清点记录', '术后首次病程记录', '麻醉术后访视记录'],
  //       cyRecord: ['出院记录', '死亡记录', '死亡病例讨论记录'],
  //       hlRecord: ['病种（病危护理记录）', '医嘱', '体温单'],
  //       zqRecord: ['手术同意书', '麻醉同意书', '输血知情同意书', '特殊检查、特殊治疗知情同意书', '病危通知书'],
  //       mzRecord: ['门诊病历', '门诊复诊', '急诊病历', '中医门诊'],
  //       tsRecord: ['新生儿病历', '产科病历', '儿科病历']
  //     };
  //   },
  //   methods: {
  //     load: function (n) {
  //       switch (n) {
  //         case '入院记录':
  //           this.$router.push('/edit');
  //           break;
  //         case 1:
  //           this.$router.push('/edit');
  //           break;
  //         case 2:
  //           this.$router.push('/stat');
  //           break;
  //         case 3:
  //           this.$router.push('/library');
  //           break;
  //         case 4:
  //           this.$router.push('/system');
  //           break;
  //         case 5:
  //           this.$router.push('/blockChain');
  //           break;
  //         case '健康体检':
  //           this.$router.push('/edit');
  //           this.$store.commit('EDIT_SET_DOC_TYPE', '健康体检')
  //           break;
  //         case '首次病程':
  //           this.$router.push('/edit');
  //           this.$store.commit('EDIT_SET_DOC_TYPE', '首次病程')
  //           break;
  //         case '入院申请':
  //           this.$router.push('/edit');
  //           LeftBar.methods.newDoc('入院申请')
  //           this.$store.commit('EDIT_SET_DOC_TYPE', '入院申请')
  //           break;
  //         case '门诊病案':
  //           this.$router.push('/edit');
  //           this.$store.commit('EDIT_SET_DOC_TYPE', '门诊病案')
  //           break;
  //         case '病程记录':
  //           this.$router.push('/edit');
  //           this.$store.commit('EDIT_SET_DOC_TYPE', '病程记录')
  //           break;
  //         case '病案首页':
  //           this.$router.push('/edit');
  //           this.$store.commit('EDIT_SET_DOC_TYPE', '病案首页')
  //           break;
  //         default:
  //           this.$router.push('/edit');
  //       }
  //     },
  //     myToggle: function (e) {
  //       e.stopPropagation()
  //       // document.getElementById('collapseSix').class('hide')
  //     }
  //   },
  // };

  // import hoemchart from '../../utils/HomeChart';
  export default {
    data() {
      return {
        name: this.$route.name,
        bcRecord: ['首次病程记录', '日常病程记录', '上级医师首次查房记录', '会诊记录', '疑难危重比管理讨论记录', '交接班记录', '转科记录', '有创诊疗操作病例'],
        wsqRecord: ['术前小结', '术前讨论', '麻醉术前访视记录', '麻醉记录', '手术记录', '手术安全检查记录', '手术清点记录', '术后首次病程记录', '麻醉术后访视记录'],
        cyRecord: ['出院记录', '死亡记录', '死亡病例讨论记录'],
        hlRecord: ['病种（病危护理记录）', '医嘱', '体温单'],
        zqRecord: ['手术同意书', '麻醉同意书', '输血知情同意书', '特殊检查、特殊治疗知情同意书', '病危通知书'],
        mzRecord: ['门诊病历', '门诊复诊', '急诊病历', '中医门诊'],
        tsRecord: ['新生儿病历', '产科病历', '儿科病历']
      };
    },
    // mounted: function () {
    //   hoemchart('homechart')
    // },
    methods: {
    },
  };
</script>

<style scoped>
/* *{margin: 0;padding: 0;border: 0}  */
</style>

