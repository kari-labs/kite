<template>
  <span>
    <input 
      v-show="editing"
      v-model="v"
      @blur="handleBlur"
      @keypress.enter="editing = false"
      ref="input"
    />
    <span 
      v-show="!editing"
      @dblclick="handleDBLClick"
    >
      {{v}}
    </span>
  </span>
</template>

<script>
export default {
  name: "KEditableText",
  props: {
    value: String,
    placeholder: String,
  },
  data() {
    return {
      v: this.value,
      styles: {
        et: true,
        etActive: false,
      },
      editing: false,
    };
  },
  computed: {
    is() {
      return this.editing ? "input" : "span";
    },
  },
  methods: {
    handleFocus() {
      this.$emit("focus", null);
      console.log(this.$refs);
    },
    handleBlur() {
      this.editing = false;
      this.$emit("blur", {
        oldValue: this.value,
        newValue: this.v,
      });
    },
    handleChange() {
      this.$emit("change", {
        oldValue: this.value,
        newValue: this.v,
      });
    },
    async handleDBLClick() {
      await (this.editing = true);
      this.$nextTick(()=>{
        this.$refs.input.focus();
      })
    },
  },
}
</script>
