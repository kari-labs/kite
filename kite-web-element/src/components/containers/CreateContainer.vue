<template>
  <div>
    <div
      @click="dialogVisible = true;$emit('click', null)"
      v-shortkey="['shift', 'n']" 
      @shortkey="dialogVisible = !dialogVisible"
      class="new"
    >
      Click here to create a container
    </div>

    <el-dialog
      title="Create New Container"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <div>
        <el-form
          :model="form"
          :label-width="formLabelWidth"
          v-loading="loading"
          :rules="rules"
          ref="createContainer"
        >
          <el-form-item
            label="Container name"
            prop="nickname"
            data-v-step="2"
          >
            <el-input
              v-model="form.nickname"
              placeholder="My Cool Container"
            />
          </el-form-item>
          <el-form-item
            label="Container image"
            prop="image"
            data-v-step="3"
          >
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
        <el-button
          @click="dialogVisible = false;"
          id="closeDialog"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click.prevent="handleCreateContainer"
          data-v-step="4"
          id="createContainerBtn"
        >
          Create Container
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    const validateContainerName = (rule, value, cb) => {
      if (!value.match(/^([aA-zZ0-9-]+)$/)) {
        cb(new Error('Use only the characters a-z, 0-9, a hyphen (-), or underscore(_) in the name.'));
      } else {
        cb();
      }
    };
    return {
      dialogVisible: false,
      form: {
        nickname: "",
        image: "PHP",
      },
      formLabelWidth: "140px",
      loading: false,
      rules: {
        nickname: [
          { required: true, message: 'Please name your container', trigger: 'change' },
          { min: 3, message: 'Please give it a name longer than three characters', trigger: 'change' },
          { validator: validateContainerName, trigger: 'change' },
        ],
        image: [
          { required: true, message: "Please select an image for your container-baby, or they'll die!", trigger: 'change' }
        ],
      }
    };
  },
  methods: {
    async handleCreateContainer() {
      this.$tours['tutorial'].stop();
      await this.$refs.createContainer.validate( async valid => {
        if (valid) {
          try {
            this.loading = true;
            await this.$apollo.mutate({
              mutation: gql`
                mutation($nickname: String!){
                  container: createContainer(
                    nickname: $nickname
                  ){
                    nickname
                    container_id
                    image
                    status
                  }
                }
              `,
              variables: {
                nickname: this.form.nickname
              },
            });
            this.loading = false;
            this.dialogVisible = false;
            this.$emit("created:container", null);
          } catch (error) {
            console.dir(error.graphQLErrors);
            this.loading = false;
            this.$message.error({
              message: error.graphQLErrors[0].message.split(": ")[1],
            });
          }
        } else {
          this.$message.error('Please fill out the form correctly');
          this.loading = false;
          return false;
        }
      } );
    },
  },
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
