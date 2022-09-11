<template>
  <v-app id="app">
      <router-view/>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      right: null,
      mini: true,
    }
  },
  methods: {
    updateActive() {
      let active = this.items.find((i) => this.$route.matched.length > 0 && i.index === this.$route.matched[0].path);
      active.active = true;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
