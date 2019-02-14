<template>
  <el-card v-loading="loading" ref="card">
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms*1000));
}

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
      this.$refs.card.$el.classList.toggle("littleHang");
      
      await this.$jraph`
        mutation {
          msg: deleteContainer(_id: "${this.container._id}")
        }
      `
      this.$refs.card.$el.classList.toggle("littleHang");
      this.$refs.card.$el.style["transform"] = "rotate(45deg)";
      this.$refs.card.$el.style["transform-origin"] = "top left";
      this.$refs.card.$el.classList.add("drop");
      await sleep(1);
      this.loading = false;
      this.$message.success("Container Deleted");
      await this.$emit("deleted", null);
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
.hang {
  animation: 4s hang forwards;
}

.drop {
  animation: 1s drop ease-in forwards;
}

.littleHang {
  animation: 1s littleHang ease-in-out infinite alternate forwards;
}
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

@keyframes hang {
  0% {
    transform: translate(0) rotate(0);
    transform-origin: top left;
    display: inherit;
  }
  
  25% {
    transform: rotate(90deg);
    transform-origin: top left;
  }
  
  50% {
    transform: rotate(45deg);
    transform-origin: top left;
  }
  
  75% {
    transform: rotate(90deg);
    transform-origin: top left;
  }
  
  85% {
    transform: rotate(45deg);
    transform-origin: top left;
  }
  
  100% {
    transform: rotate(45deg);
    transform-origin: top left;
  }
}

@keyframes littleHang {
  0% {
    transform: rotate(45deg);
    transform-origin: top left;
  }
  50% {
    transform: rotate(90deg);
    transform-origin: top left;
  }
  
  100% {
    transform: rotate(45deg);
    transform-origin: top left;
  }
}
@keyframes drop {

  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(200vh);
    visibility: hidden;
  }
}
</style>
