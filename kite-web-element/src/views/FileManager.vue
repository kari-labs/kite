<template>
  <div>
    <k-file-manager :root="user.userid" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import KFileManager from "@/components/filesys/FileManager.vue";

export default {
  data(){
    return {
    };
  },
  computed: {
      ...mapState({user: state => state.auth.user})
  },
  components: {
    KFileManager,
  }
};
</script>

<style>
.el-icon {
  margin-right: 5px;
  vertical-align: baseline;
  width: 18px;
  text-align: center;
  font-size: 18px;
  line-height: 1;
  display: inline-block;
}
</style>
