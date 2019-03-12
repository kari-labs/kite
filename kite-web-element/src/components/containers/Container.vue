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
      <template
        v-for="tool in tools"
        v-if="tool.if"
      >
        <el-tooltip
          effect="dark"
          :content="tool.text"
          placement="bottom"
          :key="tool.text"
        >
          <el-button
            @click="tool.action"
            plain
            :type="tool.type"
          >
            <fa-icon
              :icon="tool.icon"
              :style="(tool.style || {})"
              size="lg"
            />
          </el-button>
        </el-tooltip>
      </template>
    </div>
    <el-dialog
      title="Delete Container"
      :visible.sync="showDeleteDialog"
      width="35%"
    >
      <el-container>
        <article>
          <p v-html="dialogMessage">
            {{ dialogMessage }}
          </p>
          <el-form 
            :model="form"
            :rules="rules"
            ref="deleteContainer"
          >
            <el-form-item
              label=""
              prop="name"
            >
              <el-input
                v-model="form.name"
                placeholder="container name"
              />
            </el-form-item>
          </el-form>
        </article>
      </el-container>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="showDeleteDialog = false">
          Cancel
        </el-button>
        <el-button 
          type="warning"
          @click="()=>deleteContainer(false)"
          v-if="!container.deleted"
        >
          Move to Trash
        </el-button>
        <el-button 
          type="danger" 
          @click="()=>deleteContainer(true)"
          :disabled="dialogConfirmDisabled"
        >
          Delete Permanently
        </el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import gql from "graphql-tag";
import { mapState } from "vuex";
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

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
    const validateContainerName = async (rule, value, cb) => {
      if (value === this.container.nickname) {
        this.dialogConfirmDisabled = false;
        cb();
      } else {
        this.dialogConfirmDisabled = true;
        cb(new Error('The name you supplied does not match the name of the container'));
      }
    };
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
          action: ()=>{this.showDeleteDialog = true},
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
      showDeleteDialog: false,
      rules: {
        name: [
          { validator: validateContainerName, trigger: 'change' },
        ],
      },
      form: {
        name: "",
      },
      dialogConfirmDisabled: true,
    };
  },
  methods: {
    async deleteContainer(permanently) {
      this.showDeleteDialog = false;
      this.loading = true;
      this.dialogConfirmDisabled = false;
      try{
        await this.$apollo.mutate({
          mutation: gql`
            mutation($_id: String!, $permanently: Boolean!) {
              msg: deleteContainer(_id: $_id, permanently: $permanently)
            }
          `,
          variables: {
            _id: this.container._id,
            permanently: permanently,
          },
        });
        this.$notify({
          title: "Success",
          message: "Container moved to trash",
          iconClass: "el-icon-delete",
          type: "error",
        });
        await this.$emit("deleted", null);
      }catch(err) {
        this.loading = false;
        this.$message.error("Container deletion failed: "+err);
      }
    },
    openContainer() {
      window.open(`/c/${this.user.userid}/${this.container.nickname}/`,'_blank');
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
  computed: {
    ...mapState({user: state => state.auth.user}),
    dialogMessage() {
      if(this.container.deleted) {
        return `You are about to <b>permanently delete</b> the container <b>${this.container.nickname}</b>, an action that <i>cannot be undone</i>. If you are sure this is what you want to do, enter the name of the container below.`;
      }else {
        return `If you would like to move your container to the trash, please click <b>Move to Trash</b>. 
        If you would like to <i>permanently delete</i> the container <b>${this.container.nickname}</b>, 
        type the name of the container into the input field below, and click <b>Delete Permanently</b>`
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
.deleteMessage {
  text-align: center;
}
</style>
