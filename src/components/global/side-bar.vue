<template>
  <div>
    <b-button v-b-toggle.sidebar-1 class="sb mt-2" variant="light"
      ><b-icon icon="list" font-scale="2" variant="dark"></b-icon
    ></b-button>
    <b-sidebar id="sidebar-1" right shadow backdrop>
      <div>
        <b-nav vertical>
          <b-nav-item to="/" tag="router-link"
            ><b-icon icon="house" font-scale="2" variant="dark"></b-icon
          ></b-nav-item>
          <b-nav-item to="/profile" tag="router-link"
            ><b-icon icon="person-circle" font-scale="2" variant="dark"></b-icon
          ></b-nav-item>
          <b-nav-item to="/reels"
            ><b-icon icon="film" font-scale="2" variant="dark"></b-icon
          ></b-nav-item>
          <b-nav-item to="/stories"
            ><b-icon icon="book" font-scale="2" variant="dark"></b-icon
          ></b-nav-item>
          <b-nav-item to="/about"
            ><b-icon icon="info-circle" font-scale="2" variant="dark"></b-icon
          ></b-nav-item>
        </b-nav>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "side-bar",
};
</script>
<style lang="scss" scoped>
@import "@/scss/backgrounds.scss";
.sb {
  position: fixed;
  right: 10px;
  z-index: 1031;
}
</style>
