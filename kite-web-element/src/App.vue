<template>
  <!-- eslint-disable -->
  <div id="app">
    <nav>
      <router-link to="/">login</router-link> | <router-link to="/containers">containers</router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
main {
  margin: 2rem 0.5rem;
}
</style>
