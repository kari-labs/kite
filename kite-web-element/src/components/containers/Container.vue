<template>
  <el-card 
    v-loading="loading" 
    ref="card" 
    tabindex="0"
    shadow="hover"
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
      <template v-for="tool in tools" v-if="tool.if">
        <el-tooltip
          effect="dark"
          :content="tool.text"
          placement="bottom"
          :key="tool.text"
        >
          <el-button @click="tool.action" plain :type="tool.type">
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
          type: "primary",
          if: !this.container.deleted,
        },
        {
          text: "File Manager",
          icon: "folder",
          action: this.fileManager,
          type: "info",
          if: !this.container.deleted,
        },
        {
          text: "Delete Container",
          icon: "trash",
          action: this.deleteContainer,
          type: "danger",
          if: true,
        },
        {
          text: "Restore Container",
          icon: "undo",
          action: this.restoreContainer,
          type: "success",
          if: this.container.deleted,
        },
      ],
      loading: false,
    };
  },
  methods: {
    async deleteContainer() {
      const ok = await this.$confirm((this.container.deleted ? 'This will permanently delete the file. Continue?' : 'This will move your container to the trash. Continue?'), 'Danger', {
        confirmButtonText: 'I Understand',
        cancelButtonText: 'Nope.',
        type: 'error',
        confirmButtonClass: "bg-danger",
      });
      if(ok) {
        this.loading = true;
        try{
          await this.$apollo.mutate({
            mutation: gql`
              mutation($_id: String!, $permanently: Boolean!) {
                msg: deleteContainer(_id: $_id, permanently: $permanently)
              }
            `,
            variables: {
              _id: this.container._id,
              permanently: this.container.deleted
            }
          });
          this.$message.success("Container Deleted");
          await this.$emit("deleted", null);
        }catch(err) {
          this.loading = false;
          this.$message.error("Container deletion failed: "+err);
        }
      }
    },
    openContainer() {
      window.open("http://guthib.com/",'_blank');
    },
    fileManager() {
      this.$emit('openFiles', this.container.nickname);
    },
    async restoreContainer() {
      try {
        this.loading = true;
        await this.$apollo.mutate({
          mutation: gql`
            mutation($_id: String!) {
              restoreContainer(_id: $_id)
            }
          `,
          variables: {
            _id: this.container._id,
          },
        });
        this.loading = false;
        this.$emit("restored", null);
        this.$notify.success({
          title: 'Restored',
          message: 'Container Restored Succesfully'
        });
      }catch(e) {
        this.$message.error("Failed to restore container: "+ e);
      }
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
  --color-danger: #F56C6C;
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
.bg-danger {
  background-color: var(--color-danger) !important;
  border-color: var(--color-danger) !important;
  transition: 1s background-color 1s border-color;
}
.bg-danger:hover {
  background-color: #F68686 !important;
  border-color: #F68686 !important;
}
</style>
