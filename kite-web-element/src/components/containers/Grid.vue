<template>
    <div class="container-grid">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "k-grid",
    props: {
        cardWidth: {
            type: String,
            default: "300px"
        },
        justifyContent: {
            type: String,
            default: "space-around"
        },
        rowGap: {
            type: String,
            default: "2rem"
        },
        columnGap: {
            type: String,
            default: "1rem"
        }
    },
    mounted(){
        let s = this.$el.style;
        s["display"] = "grid";
        s["grid-template-columns"] = "repeat(auto-fill, "+this.cardWidth+")";
        s["grid-row-gap"] = this.rowGap;
        s["grid-column-gap"] = this.columnGap;
        s["justify-content"] = this.justifyContent;
        s["width"] = "100%";
    }
}
</script>
