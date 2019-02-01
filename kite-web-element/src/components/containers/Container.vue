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
import KQuickUpload from "@/components/filesys/QuickUpload.vue";

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
  components: {
    KQuickUpload,
  }
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
</style>
