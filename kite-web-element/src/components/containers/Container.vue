<template>
  <el-card 
    v-loading="loading" 
    ref="card" 
    tabindex="0"
  >
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
import gql from "graphql-tag";

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
        deleted: false,
      })
    },
  },
  data() {
    return {
      tools: [
        {
          text: "Open Container URL",
          icon: "external-link-square-alt",
          action: this.openContainer,
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
      //this.$refs.card.$el.classList.toggle("littleHang");
      await this.$apollo.mutate({
        mutation: gql`
          mutation($_id: String!) {
            msg: deleteContainer(_id: $_id)
          }
        `,
        variables: {
          _id: this.container._id
        }
      });
      /* this.$refs.card.$el.classList.toggle("littleHang");
      this.$refs.card.$el.style["transform"] = "rotate(45deg)";
      this.$refs.card.$el.style["transform-origin"] = "top left";
      this.$refs.card.$el.classList.add("drop"); */
      await sleep(1);
      this.loading = false;
      this.$message.success("Container Deleted");
      await this.$emit("deleted", null);
    },
    openContainer() {
      window.open("http://guthib.com/",'_blank');
    },
    fileManager() {
      this.$emit('openFiles', this.container.nickname)
    },
  },
};
</script>

<style>
:root {
  --transform-origin: top right;
  --transform-angle-one: -45deg;
  --transform-angle-two: -90deg;
  --transform-angle-three: -45deg;
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

@keyframes littleHang {
  0% {
    transform: rotate(var(--transform-angle-one));
    transform-origin: var(--transform-origin);
  }
  50% {
    transform: rotate(var(--transform-angle-two));
    transform-origin: var(--transform-origin);
  }
  
  100% {
    transform: rotate(var(--transform-angle-one));
    transform-origin: var(--transform-origin);
  }
}
@keyframes drop {

  0% {
    transform: translateY(0) rotate(var(--transform-angle-three));
    transform-origin: var(--transform-origin);
  }
  100% {
    transform: translateY(120vh) rotate(var(--transform-angle-three));
    transform-origin: var(--transform-origin);
    visibility: hidden;
  }
}
</style>
