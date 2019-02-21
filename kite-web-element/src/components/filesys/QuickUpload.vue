<template>
  <el-upload
    id="root"
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
      let req = await this.$fileManager.uploadFiles(this.$state.store.auth.user.userid, [args.file]);
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
#root {
  display: inline;
}
</style>
