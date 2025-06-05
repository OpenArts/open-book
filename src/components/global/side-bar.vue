<template>
  <div>
    <b-button v-b-toggle.sidebar-1 class="sbtn mt-2"
      ><b-icon icon="list" font-scale="2"></b-icon
    ></b-button>
    <b-sidebar id="sidebar-1" right shadow backdrop>
      <b-nav vertical class="dark">
        <b-nav-item to="/" tag="router-link"
          ><b-icon icon="house" font-scale="2"></b-icon
        ></b-nav-item>
        <b-nav-item to="/profile" tag="router-link"
          ><b-icon icon="person-circle" font-scale="2"></b-icon
        ></b-nav-item>
        <b-nav-item to="/reels"
          ><b-icon icon="film" font-scale="2"></b-icon
        ></b-nav-item>
        <b-nav-item to="/about"
          ><b-icon icon="info-circle" font-scale="2"></b-icon
        ></b-nav-item>
        <b-nav-item to="/search" tag="router-link">
          <b-icon icon="search" font-scale="1.5" class="mx-2"></b-icon>
        </b-nav-item>
        <b-nav-item to="/upload" tag="router-link">
          <b-icon icon="plus-circle" font-scale="1.5" class="mx-2"></b-icon>
        </b-nav-item>
      </b-nav>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "side-bar",
};
</script>
<style lang="scss">
@import "@/scss/backgrounds.scss";
.sbtn {
  position: fixed;
  right: 10px;
  z-index: 1031;
  background: transparent;
  border: none;
}
.dark {
  background: #1d1d1d;
  height: 100%;
  * {
    color: #fff;
  }
}
.b-sidebar > .b-sidebar-header {
  background: #1d1d1d;
  * {
    color: #fff;
  }
}
</style>
