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
          {{ container.nickname || "Card title" }}
        </span>
      </el-badge>
      <span class="el-card-header-subtitle">
        <small>{{ container.image }}</small>
      </span>
    </div>
    <div id="belt">
      <template v-for="tool in tools">
        <el-button @click="tool.action" :key="tool.text">
          <fa-icon :icon="tool.icon" />
        </el-button>
      </template>
    </div>
  </el-card>
</template>

<script>

export default {
  name: "KCard",
  props: {
    container: {
      type: Object,
      default: () => ({
        _id: "",
        nickname: "",
        owner: "",
        container_id: "",
        status: "",
        image: "",
      })
    },
  },
  data() {
    return {
      tools: [
        {
          text: "Delete Container",
          icon: "trash",
          action: this.deleteContainer
        }
      ]
    };
  },
  methods: {
    async deleteContainer() {
      this.$message.success("Container Deleted");
      await this.$jraph`
        mutation {
          deleteContainer(_id: "${this.container._id}"){
            nickname
          }
        }
      `
      await this.$emit("deleted", null);
    }
  },
};
</script>

<style>
.el-card-header {
  display: grid;
  text-align: left;
}
.el-card-header-title {
  margin: 0px;
  font-weight: 500;
}
#belt {}
</style>
