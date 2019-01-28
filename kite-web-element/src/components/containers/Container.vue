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
    </div>
    <section class="el-card-body">
      <slot>
        We still haven't designed the cards body.
      </slot>
    </section>
  </el-card>
</template>

<script>
export default {
  name: "KCard",
  props: {
    container: {
      type: Object,
      default: ()=>({
        owner: "",
        container_id: "",
        status: "running",
        image: "",
        name: ""
      })
    }
  },

};
</script>

<style scoped>
.el-card-header{
  display: grid;
  text-align: left;
}
.el-card-header-title{
  margin: 0px;
  font-weight: 500;
}
.el-card-body{
  display: flex;
  text-align: left;
  font-weight: 300;
}
</style>
