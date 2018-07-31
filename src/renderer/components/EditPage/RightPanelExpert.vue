<template>
  <div style="overflow:auto;">
    <table v-if="!this.$store.state.Edit.rightFolds.includes('专家提示')">
      <tr>
        <th colspan="10" class="table-info"> 专家提示（共有{{eLength}}条记录）
          <a href="#" v-on:click="close('专家提示')" style="float: right">✖</a>
          <a href="#" v-on:click="fold('专家提示')" style="float: right; marginRight: 3px">↗</a>
        </th>
      </tr>
      <tr v-for="(data, index) in expertHint" v-bind:key='index'>
        <td> {{index + 1}} </td>
        <td v-on:click="getItem(data, index)">{{data}}</td>
      </tr>
    </table>
    <table v-if="this.$store.state.Edit.rightFolds.includes('专家提示')">
      <tr>
        <th colspan="10" class="table-info"> 专家提示（共有{{eLength}}条记录）
          <a href="#" v-on:click="close('专家提示')" style="float: right">✖</a>
          <a href="#" v-on:click="fold('专家提示')" style="float: right; marginRight: 5px">↙</a>
        </th>
      </tr>
      <tr  style="textAlign: center"><a href="#" v-on:click="fold('专家提示')">...</a></tr>
    </table>
  </div>
</template>

<script>
  export default {
    components: { },
    computed: {
      expertHint: {
        get() {
          return this.$store.state.Edit.expertHint
        }
      },
      eLength: {
        get() {
          return this.$store.state.Edit.expertHint.length
        }
      }
    },
    methods: {
      close(data) {
        this.$store.commit('EDIT_DELETE_RIGHT_PANELS', data);
      },
      fold(data) {
        this.$store.commit('EDIT_SET_RIGHT_FOLDS', data);
      },
      getItem: function (item) {
        const value = `${this.$store.state.Edit.editBarValue} ${item}`
        this.$store.commit('EDIT_SET_BAR_VALUE', value)
        document.getElementById('edit-editbar-input').focus()
      },
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
