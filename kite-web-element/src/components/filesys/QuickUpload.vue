<template>
  <el-upload
    action
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
</template>

<script>
export default {
  name: "KQuickUpload",
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

<style>
</style>
