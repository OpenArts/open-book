<template>
  <b-navbar type="light" class="blur mbar" fixed="top">
    <b-navbar-brand to="/" tag="router-link">
      <b-icon
        icon="facebook"
        variant="primary"
        font-scale="2"
        class="mx-2"
      ></b-icon>
    </b-navbar-brand>
    <b-navbar-nav class="bg-success">
      <b-nav-form class="bg-light">
        <b-input-group>
          <b-form-input
            size="md"
            placeholder="Search..."
            variant="light"
          ></b-form-input>
          <b-button variant="light" size="md"
            ><b-icon icon="search" font-scal="md"></b-icon
          ></b-button>
        </b-input-group>
      </b-nav-form>
    </b-navbar-nav>
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
