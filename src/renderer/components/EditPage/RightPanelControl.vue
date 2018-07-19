<template>
  <div style="overflow:auto;">
    <table v-if="!this.$store.state.Edit.rightFolds.includes('病案质控')">
      <tr>
        <th colspan="10" class="table-info"> 病案质控（共有{{cLength}}条记录）
          <a href="#" v-on:click="close('病案质控')" style="float: right">✖</a>
          <a href="#" v-on:click="fold('病案质控')" style="float: right; marginRight: 3px">↗</a>
        </th>
      </tr>
      <tr v-for="(data, index) in control" v-bind:key='index'>
        <td> {{index + 1}} </td>
        <td>{{data}}</td>
        <td><a href="#" v-on:click="addControl(data)">添加</a></td>
        <td><a href="#" v-on:click="delControl(index)">删除</a></td>
      </tr>
    </table>
    <table v-if="this.$store.state.Edit.rightFolds.includes('病案质控')">
      <tr>
        <th colspan="10" class="table-info"> 病案质控（共有{{cLength}}条记录）
          <a href="#" v-on:click="close('病案质控')" style="float: right">✖</a>
          <a href="#" v-on:click="fold('病案质控')" style="float: right; marginRight: 5px">↙</a>
        </th>
      </tr>
      <tr  style="textAlign: center"><a href="#" v-on:click="fold('病案质控')">...</a></tr>
    </table>
  </div>
</template>

<script>
  import { addDocControl } from '../../utils/EditServerFile'
  export default {
    components: { },
    computed: {
      control: {
        get() {
          return this.$store.state.Edit.docControl
        }
      },
      cLength: {
        get() {
          return this.$store.state.Edit.docControl.length
        }
      }
    },
    methods: {
      addControl(data) {
        addDocControl(this, [this.$store.state.System.server, this.$store.state.System.port], data)
      },
      delControl(index) {
        this.$store.commit('EDIT_DELETE_DOC_CONTROL', index);
      },
      close(data) {
        this.$store.commit('EDIT_DELETE_RIGHT_PANELS', data);
      },
      fold(data) {
        this.$store.commit('EDIT_SET_RIGHT_FOLDS', data);
      }
    }
  };
</script>

<style scoped>
  td {
    margin: 0;
    padding: 0;
  }

  ol {
    margin: 0;
    border: 0;
    padding: 0;
  }
</style>
