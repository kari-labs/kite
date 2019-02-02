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
    
  </el-card>
</template>

<script>

export default {
  name: "KCard",
  data() {
    return {};
  },
  props: {
    container: {
      type: Object,
      default: () => ({
        owner: "",
        container_id: "",
        status: "",
        image: "",
        nickname: ""
      })
    },
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
.el-card__body {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;
  font-weight: 300;
  padding: 12px 19.416px !important;
  height: max-content;
}
</style>
