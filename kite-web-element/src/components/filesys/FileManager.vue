<template>
  <div>
    <el-dialog
      :title="'Upload to ' + root"
      :visible.sync="uploadVisible"
      width="400px"
    >
      <el-upload
        class="upload-demo"
        drag
        action=""
        :http-request="handleUpload"
        :before-remove="handleRemove"
        multiple
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
      </el-upload>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="uploadVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="uploadVisible = false"
        >
          Done
        </el-button>
      </span>
    </el-dialog>

    <el-card shadow="never">
      <div class="header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item />
          <el-breadcrumb-item
            v-for="node in root.split('/')"
            :key="node"
          >
            {{ node }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div>
          <el-button
            size="small"
            type="primary"
            @click="uploadVisible=true"
          >
            Click to upload
          </el-button>
          <el-button
            size="small"
            @click="reload()"
          >
            <fa-icon
              icon="sync-alt"
            />
          </el-button>
        </div>
      </div>
      <el-tree
        v-if="show"
        :props="treeProps"
        :load="loadFiles"
        draggable
        @node-drop="handleDrop"
        :allow-drop="allowDrop"
        lazy
        show-checkbox
      >
        <span slot-scope="{ node, data }">
          <i class="el-icon">
            <fa-icon
              icon="folder"
              v-if="data.isdirectory"
            />
            <fa-icon
              icon="file"
              v-else
            />
          </i>
          {{ data.name }}
        </span>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import * as path from 'path';

function getFilePath(node) {
  let currentNode = node;
  let filepath = "";
  while(currentNode && currentNode.data) {
    filepath = path.join(currentNode.data.name, filepath);
    currentNode = currentNode.parent;
  }
  return filepath
}

export default {
  data(){
    return {
      treeProps: {
        label: 'name',
        isLeaf: data => !data.isdirectory
      },
      uploadVisible: false,
      show: true,
    };
  },
  props: {
    root: {
      type: String,
      default: '/'
    }
  },
  watch: {
    root() {
      this.reload();
    }
  },
  methods: {
    async loadFiles(node, resolve) {
      if(node.level === 0) {
        return resolve(await this.$fileManager.getFiles(this.root, ''))
      }

      return resolve(await this.$fileManager.getFiles(this.root, getFilePath(node)))

    },
    abortUploads() {

    },
    async handleUpload(args) {
      let req = await this.$fileManager.uploadFiles(this.root, [args.file]);
      this.reload();
      if(req.data){
        this.$emit("success");
      }else if(req.errors){
        this.$emit("error", args.file);
      }else{
        this.$emit("error", args.file);
      }
    },
    handleRemove() {
      console.log('handleRemove', [...arguments])
    },
    handleDrop(draggingNode, dropNode, dropType) {
      console.log(`Renaming ${getFilePath(draggingNode)} to ${path.join(getFilePath(dropNode), dropNode.data.name)}`)
      console.log('tree drop: ', dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if(type=='next' || type=='prev') return false;
      return false; // dropNode.data.isdirectory;
    },
    reload() {
      this.show = false;
      this.$nextTick(() => {
          this.show = true
      })
    }
  }
};
</script>

<style scpoed="true">
.el-icon {
  margin-right: 5px;
  vertical-align: baseline;
  width: 18px;
  text-align: center;
  font-size: 18px;
  line-height: 1;
  display: inline-block;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header > span {
  color: rgb(96, 98, 102);
}
</style>