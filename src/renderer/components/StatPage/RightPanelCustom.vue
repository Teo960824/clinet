<template>
  <div class="row">
    <div class="col-md-6">
      全部指标&nbsp;&nbsp;&nbsp;&nbsp;
      <a v-show="this.notice.a !== null" v-on:click="title('a')">{{this.notice.a}}</a>
      <a v-show="this.notice.b !== null" v-on:click="title('b')">&nbsp;--&nbsp;{{this.notice.b}}</a>
      <a v-show="this.notice.c !== null">&nbsp;--&nbsp;{{this.notice.c}}</a>
      <div class="pre-scrollable" style="padding: 0px 30px 0px 30px; overflow-x: hidden;">
        <div class="row">
          <div class="col-md-4 text-center border border-dark" v-for="(data, index) in this.$store.state.System.targetList" v-bind:class="{'bg-primary': flag.a === index}" v-bind:key="index" v-on:click="target(data, index)">{{data}}</div>
        </div>
        <hr />
        <div class="row">
          <div class="col-md-4 text-center border border-dark" v-for="(data, index) in this.$store.state.System.targetIndex" v-bind:class="{'bg-primary': flag.b === index}" v-bind:key="index" v-on:click="addTarget(data, index)">
            {{data}}
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-md-6 text-center border border-dark" v-for="(data, index) in this.$store.state.System.targetKey" v-bind:class="{'bg-primary': flag.c === index}" v-bind:key="index">
            {{data}} <a class="oi oi-plus float-right" v-on:click="addTargetkey(data, index)"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      自定义指标
      <div class="pre-scrollable" style="padding: 0px 10px 0px 10px; overflow-x: hidden;">
        <div class="row">
          <div class="col-md-6 text-center border border-dark" v-for="(data, index) in this.$store.state.Stat.customindex" v-bind:key="index">
            {{data}} <a class="oi oi-minus float-right" v-on:click="addTargetkey(data, index)"></a>
          </div>
        </div>
        <!-- <button type="button" class="btn btn-primary" v-on:click="custom()">保存</button> -->
      </div>
    </div>
  </div>
</template>

<script>
  import { sGetTarget, sGetTargetKey } from '../../utils/Server';
  // import { sCustom } from '../../utils/StatServerFile';
  export default {
    data() {
      return {
        flag: {
          a: null,
          b: null,
          c: null
        },
        notice: {
          a: null,
          b: null,
          c: null
        }
      }
    },
    computed: {
      leftPanel: {
        get() {
          return this.$store.state.Stat.leftPanel
        }
      }
    },
    methods: {
      title: function (a) {
        switch (a) {
          case 'a':
            this.notice.b = null
            this.notice.c = null
            this.flag.b = null
            this.flag.c = null
            break;
          case 'b':
            this.notice.c = null
            this.flag.c = null
            break;
          default:
        }
      },
      target: function (target, index) {
        this.flag.a = index
        this.flag.b = null
        this.flag.c = null
        this.notice.a = target
        this.notice.b = null
        this.notice.c = null
        sGetTarget(this, [this.$store.state.System.server, this.$store.state.System.port], target);
      },
      addTarget: function (value, index) {
        this.flag.b = index
        this.flag.c = null
        this.notice.b = value
        this.notice.c = null
        sGetTargetKey(this, [this.$store.state.System.server, this.$store.state.System.port], value, this.$store.state.System.user.username)
      },
      addTargetkey: function (value, index) {
        this.flag.c = index
        this.notice.c = value
        this.$store.commit('STAT_SET_CUSTOM_INDEX', value);
      },
      // custom: function () {
      //   sCustom(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Stat.customindex, this.$store.state.System.user.username)
      // }
    },
  };
</script>

<style scoped>

</style>
