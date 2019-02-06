<template>
  <div>
    <div
      @click="dialogVisible = true"
      class="new"
    >
      Click here to create a container
    </div>

    <el-dialog
      title="Create New Container"
      :visible.sync="dialogVisible"
      width="550px"
    >
      <div>
        <el-form
          :model="form"
          :label-width="formLabelWidth"
          ref="createContainer"
          v-loading="loading"
        >
          <el-form-item label="Container name">
            <el-input v-model="form.nickname" placeholder="My Cool Container" />
          </el-form-item>
          <el-form-item label="Container image">
            <el-select
              v-model="form.image"
              placeholder="Select container image"
              
              :filterable="true"
            >
              <el-option
                label="PHP"
                value="sseemayer/mini-php"
                selected
              />
              <el-option
                label="Node.js"
                value="node/node"
                selected
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="handleCreateContainer"
        >
          Create Container
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        nickname: "",
        image: "PHP",
      },
      formLabelWidth: "120px",
      loading: false,
    };
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async handleCreateContainer() {
      this.loading = true;
      const res = await this.$jraph`
        mutation{
          container: createContainer(
            nickname: "${this.form.nickname}"
          ){
            nickname
            container_id
            image
            status
          }
        }
      `;
      
      if(res.errors){
        console.log(res.errors);
        const h = this.$createElement;
        if(res.errors.length == 1){
          this.$message.error(res.errors[0].message);
        }else{
          res.errors.map( e => { this.$message.error(e.message); } )
        }
        
      }else{
        this.$emit("created", null);
      }
      this.loading = false;
      this.dialogVisible = false;
    },
  }
};
</script>

<style scoped>
.new {
  border: 4px dashed rgba(0,0,0,0.2);
  color: rgba(0,0,0,0.3);
  border-radius: 6px;
  width: 400px;
  height: 203.85px;
  text-align: center;
  line-height: 203.85px;
  cursor: pointer;
  font-family: "Roboto";
  font-weight: 400;
  transition: .175s color, .175s border;
}
.new:hover{
  border-color: rgba(0,0,0,0.3);
  color: rgba(0,0,0,0.4);
}
.el-select {
  width: 100%;
}
</style>
