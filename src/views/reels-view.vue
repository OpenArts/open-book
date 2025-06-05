<template>
  <div class="handle-lg">
    <reelsNavigator
      :reels="$store.state.suggestions.reels"
      reelsObj="suggestions"
      reelsList="reels"
    />
  </div>
</template>
<script>
import reelsNavigator from "@/components/global/reels-navigator.vue";

export default {
  name: "reels-view",
  components: {
    reelsNavigator,
  },
};
</script>

<style scoped>
@media screen and (min-width: 925px) {
  .handle-lg {
    max-width: 30%;
    margin: auto;
  }
}
</style>
