<template>
  <b-list-group-item
    class="d-flex align-items-center justify-content-between"
    variant="dark"
  >
    <div class="d-flex justify-content-between align-items-center">
      <b-avatar
        v-if="avatar && typeof avatar === 'string'"
        :src="avatar"
        size="40px"
        class="mr-2"
      ></b-avatar>
      <h6 class="ml-2" v-html="name"></h6>
    </div>
    <b-button size="sm" variant="success" class="d-flex mr-0">
      <b-icon icon="plus"></b-icon>
      <b-icon icon="person"></b-icon>
    </b-button>
  </b-list-group-item>
</template>

<script>
export default {
  props: ["name", "avatar"],
  name: "userStructure",
};
</script>
