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
      <slot>
        We still haven't designed the cards body.
      </slot>
      <el-upload
        class="upload-demo"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
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
          jpg/png files with a size less than 500kb
        </div>
      </el-upload>
    </section>
  </el-card>
</template>

<script>
export default {
  name: "KCard",
  data(){
    return {
      /* eslint-disable */
      fileList: []
    };
  },
  props: {
    container: {
      type: Object,
      default: ()=>({
        owner: "",
        container_id: "",
        status: "running",
        image: "",
        name: ""
      })
    }
  },
  methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`delete ${ file.name }?`);
      },
      handleUpload(args) {
        console.log(args);
        this.$uploadFiles({
          
        });
      }
  }
};
</script>

<style scoped>
.el-card-header{
  display: grid;
  text-align: left;
}
.el-card-header-title{
  margin: 0px;
  font-weight: 500;
}
.el-card-body{
  display: flex;
  text-align: left;
  font-weight: 300;
}
</style>
