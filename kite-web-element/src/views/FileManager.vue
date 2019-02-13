<template>
  <div>
    <el-card>
      File Manager
      <el-button @click="reload()">
        <fa-icon
          icon="sync-alt"
        />
      </el-button>
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
import { mapState } from 'vuex';
import * as path from 'path';

function getFilePath(node) {
  console.log('getfp', node)
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
      files: [],
      show: true
    };
  },
  computed: {
      ...mapState({user: state => state.auth.user})
  },
  methods: {
    async loadFiles(node, resolve) {
      console.log('loadf', node)
      if(node.level === 0) {
        return resolve(await this.$fileManager.getFiles(this.user.userid, ''))
      }

      return resolve(await this.$fileManager.getFiles(this.user.userid, getFilePath(node)))

    },
    handleDrop(draggingNode, dropNode, dropType) {
      console.log(`Renaming ${getFilePath(draggingNode)} to ${path.join(getFilePath(dropNode), dropNode.data.name)}`)
      console.log('tree drop: ', dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if(type=='next' || type=='prev') return false
      return dropNode.data.isdirectory;
    },
    reload() {
      this.show = false;
      this.$nextTick(() => {
          this.show = true
      })
    }
  },
  async mounted() {
    //this.files = await this.$fileManager.getFiles('001416358', '');
    //console.log(this.files)
  }
};
</script>

<style>
.el-icon {
  margin-right: 5px;
  vertical-align: baseline;
  width: 18px;
  text-align: center;
  font-size: 18px;
  line-height: 1;
  display: inline-block;
}
</style>
