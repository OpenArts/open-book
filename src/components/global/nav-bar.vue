<template>
  <b-navbar toggleable="sm" type="light" class="blur" fixed="top">
    <b-navbar-brand to="/" tag="router-link">
      <b>Black Book</b>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/" tag="router-link">
          <b-icon icon="house" font-scale="1.5" class="mx-2"></b-icon>
        </b-nav-item>
        <b-nav-item to="/profile" tag="router-link">
          <b-icon icon="person-circle" font-scale="1.5" class="mx-2"></b-icon>
        </b-nav-item>
        <b-nav-item to="/reels" tag="router-link">
          <b-icon icon="film" font-scale="1.5" class="mx-2"></b-icon>
        </b-nav-item>
        <b-nav-item to="/about" tag="router-link">
          <b-icon icon="info-circle" font-scale="1.5" class="mx-2"></b-icon>
        </b-nav-item>
        <b-nav-item to="/search" tag="router-link">
          <b-icon icon="search" font-scale="1.5" class="mx-2"></b-icon>
        </b-nav-item>
        <b-nav-item to="/upload" tag="router-link">
          <b-icon icon="plus-circle" font-scale="1.5" class="mx-2"></b-icon>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "nav-bar",
};
</script>
<style lang="scss">
@import "@/scss/backgrounds.scss";
.blur {
  backdrop-filter: $blur;
  background: #ffffff52;
}
</style>
