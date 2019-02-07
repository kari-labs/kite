<template>
  <div>
    <el-card>
      <el-tree
        :props="treeProps"
        :load="loadFiles"
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
      files: []
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

    }
  },
  async mounted() {
    this.files = await this.$fileManager.getFiles('001416358', '');
    console.log(this.files)
  }
};
</script>

<style></style>
