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
      :before-close="handleClose"
    >
      <el-container>
        <el-form
          :model="form"
          :label-width="formLabelWidth"
        >
          <el-form-item label="Container name">
            <el-input v-model="form.nickname" />
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
      </el-container>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">
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
    };
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    handleClose(done) {
      this.$confirm("Are you sure to close this dialog?")
        .then(() => {
          this.dialogVisible = false;
          done();
        })
        .catch(() => {});
    },
    async handleCreateContainer() {
      const req = await this.$jraph`
        mutation{
          container: createContainer(
            nickname: "${this.form.nickname}"
          )
        }
      `;
      this.$emit("created", null);
      console.log(req);
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
</style>
