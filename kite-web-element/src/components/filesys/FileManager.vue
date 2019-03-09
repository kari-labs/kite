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
            v-for="node in [user.userid, ...root.split('/')]"
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
        @node-drop="handleDrop"
        node-key="id"
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
          <KEditableText 
            :value="data.name"
            @blur="(e)=>{handleRename(e, node, data)}"
          />
        </span>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import * as path from 'path';
import KEditableText from "@/components/filesys/KEditableText.vue"

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
        isLeaf: data => !data.isdirectory,
        children: []
      },
      uploadVisible: false,
      show: true,
    };
  },
  props: {
    root: {
      type: String,
      default: ''
    }
  },
  watch: {
    root() {
      this.reload();
    },
  },
  computed: {
      ...mapState({user: state => state.auth.user})
  },
  methods: {
    async loadFiles(node, resolve) {
      if(node.level === 0) {
        console.log(node)
        return resolve(await this.$fileManager.getFiles(this.user.userid, this.root));
      }
      return resolve(await this.$fileManager.getFiles(this.user.userid, path.join(this.root, getFilePath(node))))
    },
    abortUploads() {

    },
    async handleUpload(args) {
      let req = await this.$fileManager.uploadFiles(path.join(this.user.userid, this.root), [args.file]);
      this.reload();
      if(req.data){
        this.$emit("success");
      }else if(req.errors){
        this.$emit("error", args.file);
      }else{
        this.$emit("error", args.file);
      }
    },
    async handleRename(args, node, data) {
      let [a, b] = "";
      a = path.join( this.root, getFilePath(node) );
      data.name = args.newValue;
      b = path.join( this.root, getFilePath(node) );
      try {
        await this.$fileManager.renameFile(this.user.userid, a, b);
      }catch(err){
        this.$notify.error("An error occured while renaming that file");
      }
    },
    handleRemove() {
      console.log('handleRemove', [...arguments])
    },
    async handleDrop(draggingNode, dropNode, dropType) {
      console.log(draggingNode, dropNode);
      let oldFile = path.join(this.root, getFilePath(draggingNode) );
      let newFile = dropType == 'inner' ? path.join(this.root,getFilePath(dropNode),oldFile) : path.join(this.root, path.dirname(getFilePath(dropNode)), oldFile);
      console.log(oldFile, newFile);
      await this.$fileManager.renameFile(this.user.userid, oldFile, newFile);
      console.log('tree drop: ', dropNode, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if(type=='next' || type=="prev") return false;
      else return false //dropNode.data.isdirectory;
    },
    reload() {
      this.show = false;
      this.$nextTick(() => {
          this.show = true
      })
    }
  },
  components: {
    KEditableText,
  },
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
