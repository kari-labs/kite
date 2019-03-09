<template>
  <div>
    <k-file-manager />
  </div>
</template>

<script>
import KEditableText from "@/components/filesys/KEditableText.vue"
import KFileManager from "@/components/filesys/FileManager.vue";

export default {
  data(){
    return {
    };
  },
  components: {
    KFileManager,
    KEditableText,
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
