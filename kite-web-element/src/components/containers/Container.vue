<template>
  <el-card v-loading="loading">
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
        <el-tooltip
          effect="dark"
          :content="tool.text"
          placement="bottom"
          :key="tool.text"
        >
          <el-button @click="tool.action">
            <fa-icon
              :icon="tool.icon"
              :style="(tool.style || {})"
              size="lg"
            />
          </el-button>
        </el-tooltip>
      </template>
    </div>
  </el-card>
</template>

<script>
import KQuickUpload from "@/components/filesys/QuickUpload.vue";

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
          text: "Open Container URL",
          icon: "external-link-square-alt",
          action: ()=>{},
        },
        {
          text: "Open File Manager",
          icon: "folder",
          action: this.fileManager,
        },
        {
          text: "Delete Container",
          icon: "trash",
          action: this.deleteContainer,
          style: {
            color: "#F56C6C",
          },
        },
      ],
      loading: false,
    };
  },
  methods: {
    async deleteContainer() {
      this.loading = true;
      
      await this.$jraph`
        mutation {
          msg: deleteContainer(_id: "${this.container._id}")
        }
      `
      await this.$emit("deleted", null);
      this.loading = false;
      this.$message.success("Container Deleted");
    },
    fileManager() {
      this.$notify.error({
          title: "File Manager!",
          message: "Hey! We haven't built this feature yet :-(",
          position: "bottom-left",
      });
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
#belt {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  padding-top: 10px;
}
</style>
