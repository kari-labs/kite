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
        :allow-drag="allowDrag"
        lazy
        show-checkbox
      />
    </el-card>
  </div>
</template>

<script>
import * as path from 'path';

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
      console.log(node)
      if(node.level === 0) {
        return resolve(await this.$fileManager.getFiles('001416358', ''))
      }
      let currentNode = node;
      let filepath = "";
      while(currentNode && currentNode.data) {
        filepath = path.join(currentNode.data.name, filepath);
        currentNode = currentNode.parent;
      }

      return resolve(await this.$fileManager.getFiles('001416358', filepath))

    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
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
    this.files = await this.$fileManager.getFiles('001416358', '');
    console.log(this.files)
  }
};
</script>

<style></style>
