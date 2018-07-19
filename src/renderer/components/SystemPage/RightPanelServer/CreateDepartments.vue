<template>
  <div>
    <form>
      <div class="form-group">
        <label>所在机构</label>
        <input type="text" class="form-control" placeholder="OrgName" id="system_department_name" v-model="DepartmentInfo.org" @input="deps()"/>
      </div>
      <div class="form-group">
        <label>科室主任</label>
        <input type="text" class="form-control" placeholder="Director of the Department" id="system_department_director" v-model="DepartmentInfo.cherf_department" @input="deps()"/>
      </div>
      <div class="form-group">
        <label>所属科室类</label>
        <input type="text" class="form-control" placeholder="The Department Class" id="system_department_class" v-model="DepartmentInfo.class" @input="deps()"/>
      </div>
      <div class="form-group">
        <label>所属科室</label>
        <input type="text" class="form-control" placeholder="The Department" id="system_department_affiliated" v-model="DepartmentInfo.department" @input="deps()"/>
      </div>
      <div class="form-group">
        <div class="custom-control custom-checkbox my-1 mr-sm-2">
          <input type="checkbox" class="custom-control-input" id="system_department_improt1" v-model="DepartmentInfo.is_imp" @input="deps()">
          <label class="custom-control-label" for="system_department_improt1">是否重点</label>
        </div>
      </div>
      <div class="form-group">
        <div class="custom-control custom-checkbox my-1 mr-sm-2">
          <input type="checkbox" class="custom-control-input" id="system_department_characteristic1" v-model="DepartmentInfo.is_spe" @input="deps()">
          <label class="custom-control-label" for="system_department_characteristic1">是否特色</label>
        </div>
      </div>
      <div class="form-group">
        <label>副主任</label>
        <input type="text" class="form-control" placeholder="Professor" id="system_department_Deputy" v-model="DepartmentInfo.professor" @input="deps()"/>
      </div>
      <div class="form-group">
        <label>内部科室编码</label>
        <input type="text" class="form-control" placeholder="Wt_Code" id="system_department_coding" v-model="DepartmentInfo.code" @input="deps()"/>
      </div>
      <div class="form-group">
        <label>内部科室名称</label>
        <input type="text" class="form-control" placeholder="Wt_name" id="system_department_name1" v-model="DepartmentInfo.wt_name" @input="deps()"/>
      </div>
    </form>
    <div class="row">
      <div class="col-9" />
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        DepartmentInfo: {
          org: this.$store.state.System.departmentInfo.org,
          cherf_department: this.$store.state.System.departmentInfo.cherf_department,
          class: this.$store.state.System.departmentInfo.class,
          department: this.$store.state.System.departmentInfo.department,
          is_imp: this.$store.state.System.departmentInfo.is_imp,
          is_spe: this.$store.state.System.departmentInfo.is_spe,
          professor: this.$store.state.System.departmentInfo.professor,
          code: this.$store.state.System.departmentInfo.wt_code,
          wt_name: this.$store.state.System.departmentInfo.wt_name,
        }
      }
    },
    methods: {
      deps: function () {
        const b = {
          org: this.DepartmentInfo.org,
          cherf_department: this.DepartmentInfo.cherf_department,
          class: this.DepartmentInfo.class,
          department: this.DepartmentInfo.department,
          is_imp: this.DepartmentInfo.is_imp,
          is_spe: this.DepartmentInfo.is_spe,
          professor: this.DepartmentInfo.professor,
          code: this.DepartmentInfo.code,
          wt_name: this.DepartmentInfo.wt_name,
        }
        this.$store.commit('SYSTEM_GET_DEPARTMENT_INFO', b)
      },
      createOrgs: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getOrgs');
        this.$store.commit('SYSTEM_GET_ORGPAGE', 'getDepartment');
      }
    }
  }
</script>
