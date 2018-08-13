<template>
  <div style="overflow:auto;" >
    <div v-for="(data1, index1) of expertHint" v-bind:key='index1'>
      <table v-if="!rightFolds.includes('专家提示')">
        <tr>
          <th colspan="10" class="table-info"> 专家提示（共有{{data1.length}}条记录）
            <a href="#" v-on:click="close('专家提示')" style="float: right">✖</a>
            <a href="#" v-on:click="fold('专家提示')" style="float: right; marginRight: 3px">↗</a>
          </th>
        </tr>
        <tr v-for="(data, index) in data1" v-bind:key='index'>
          <td> {{index + 1}} </td>
          <td v-on:click="getItem(data)" v-on:dblclick="addItem(data)">{{expertKey}}</td>
          <td v-on:click="getItem(data)" v-on:dblclick="addItem(data)">{{data}}</td>
        </tr>
      </table>
      <table v-if="rightFolds.includes('专家提示')">
      <tr>
        <th colspan="10" class="table-info"> 专家提示（共有{{eLength}}条记录）
          <a href="#" v-on:click="close('专家提示')" style="float: right">✖</a>
          <a href="#" v-on:click="fold('专家提示')" style="float: right; marginRight: 5px">↙</a>
        </th>
      </tr>
      <tr  style="textAlign: center"><a href="#" v-on:click="fold('专家提示')">...</a></tr>
    </table>
    </div>
  </div>
</template>

<script>
  export default {
    components: { },
    computed: {
      rightFolds: {
        get() {
          return this.$store.state.Edit.rightFolds
        }
      },
      expertKey: {
        get() {
          console.log(this.$store.state.Edit.expertHint)
          return this.$store.state.Edit.expertHint.symptom
        }
      },
      expertHint: {
        get() {
          const arr = []
          const keys = Object.keys(this.$store.state.Edit.expertHint)
          keys.forEach((x) => {
            if (x !== 'symptom' && x !== 'section') {
              arr.push(this.$store.state.Edit.expertHint[x])
            }
          })
          return arr
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
        const value = `${this.expertKey} ${item}`
        this.$store.commit('EDIT_SET_BAR_VALUE', value)
        document.getElementById('edit-editbar-input').focus()
      },
      addItem: function (item) {
        const value = `${this.expertKey} ${item}`
        this.$store.commit('EDIT_SET_BAR_VALUE', value)
        const n = this.$store.state.Edit.docIndex
        this.$store.commit('EDIT_UPDATE_DOC', [n, [this.expertKey, item]]);
        this.$store.commit('EDIT_SET_DOC_INDEX', [1]);
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
