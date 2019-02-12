<template>
  <div>
    <el-card>
      <el-button @click="reload()">reload</el-button>
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
          <i
            class="el-icon-document"
            v-if="!data.isdirectory"
          />
          {{data.name}}
        </span>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
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
  methods: {
    async loadFiles(node, resolve) {
      console.log('loadf', node)
      if(node.level === 0) {
        return resolve(await this.$fileManager.getFiles('001416358', ''))
      }

      return resolve(await this.$fileManager.getFiles('001416358', getFilePath(node)))

    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
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

<style></style>
