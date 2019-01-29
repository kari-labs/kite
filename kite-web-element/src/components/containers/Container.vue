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
      <span class="el-card-header-subtitle">
        <small>{{ container.image }}</small>
      </span>
    </div>
    <section class="el-card-body">
      <slot>We still haven't designed the cards body.</slot>
      <br>
      <br>
      <k-quick-upload />
    </section>
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
        status: "running",
        image: "",
        name: ""
      })
    },
  },
  components: {
    KQuickUpload,
  }
};
</script>

<style scoped>
.el-card-header {
  display: grid;
  text-align: left;
}
.el-card-header-title {
  margin: 0px;
  font-weight: 500;
}
.el-card-body {
  display: flex;
  flex-direction: column;
  text-align: left;
  font-weight: 300;
}
</style>
