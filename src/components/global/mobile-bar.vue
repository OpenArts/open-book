<template>
  <b-navbar type="light" class="blur mbar" fixed="top">
    <b-navbar-brand to="/" tag="router-link">
      <b>Black Book</b>
    </b-navbar-brand>
    <b-navbar-nav class="bg-success"></b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "mobile-bar",
};
</script>

<style>
.mbar {
  z-index: 0;
}
</style>
