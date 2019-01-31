<template>
  <div class="deck container-grid">
    <slot />
  </div>
</template>

<script>
export default {
    name: "KGrid"
}
</script>

<style>
.deck {
    display: grid;
    /* THIS IS WHERE YOU CHANGE THE CARD_WIDTH */
    grid-template-columns: repeat(auto-fill, 400px);
    grid-row-gap: 2em;
    grid-column-gap: 2em;
    justify-content: "space-around";
    width: 100%;
}
.deck > *{
  width: 400px;
  height: 203.85px;
}
</style>
