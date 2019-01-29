<template>
  <el-card>
    <div
      slot="header"
      class="el-card-header"
    >
      <el-badge
        is-dot
        :type="container.status == 'running' ? 'success' : 'danger'"
      >
        <span class="el-card-header-title">
          {{ container.name || "Card title" }}
        </span>
      </el-badge>
    </div>
    <section class="el-card-body">
      <el-upload
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="5"
        :on-exceed="handleExceed"
        :http-request="handleUpload"
      >
        <el-button
          size="small"
          type="primary"
        >
          Click to upload
        </el-button>
        <div
          slot="tip"
          class="el-upload__tip"
        >
          Quickly upload files to your container
        </div>
      </el-upload>
      <br>
      <slot>We still haven't designed the cards body.</slot>
    </section>
  </el-card>
</template>

<script>
export default {
  name: "KCard",
  data() {
    return {};
  },
  props: {
    container: {
      type: Object,
      default: () => ({
        owner: "",
        container_id: "",
        status: "running",
        image: "",
        name: ""
      })
    }
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files) {
      this.$message.warning(
        `The limit is 5, you selected ${
          files.length
        } files this time`
      );
    },
    beforeRemove(file) {
      return this.$confirm(`delete ${file.name}?`);
    },
    async handleUpload(args) {
      let req = await this.$uploadFiles({
        query: this.$gql`
          mutation($files: [Upload!]!){
            multipleUpload(userid: "001416358", files: $files){
                name
                size
            }
          }
        `,
        files: [args.file]
      });
      if(req.data){
        this.$emit("success");
      }else if(req.errors){
        this.$emit("error", args.file);
      }else{
        this.$emit("error", args.file);
      }
    }
  }
};
</script>

<style scoped>
.el-card-header {
  display: grid;
  text-align: left;
}
.el-card-header-title {
  margin: 0px;
  font-weight: 500;
}
.el-card-body {
  display: flex;
  flex-direction: column;
  text-align: left;
  font-weight: 300;
}
</style>
