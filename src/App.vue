<template>
  <div id="app">
    <nav-bar class="d-none d-md-flex" />
    <side-bar class="d-md-none" />
    <mobile-bar class="d-md-none" />
    <div id="rtv">
      <router-view />
    </div>
  </div>
</template>

<script>
import navBar from "./components/global/nav-bar.vue";
import sideBar from "./components/global/side-bar.vue";
import mobileBar from "./components/global/mobile-bar.vue";

export default {
  components: {
    navBar,
    sideBar,
    mobileBar,
  },
};
</script>

<style lang="scss">
@import "@/scss/backgrounds.scss";
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
#app {
  background: $Main;
  min-height: 100vh;
  overflow: hidden;
  #rtv {
    padding-top: 80px;
    min-width: 100vw;
    min-height: 70vh;
  }
}
</style>
