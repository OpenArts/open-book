<template>
  <div class="container main">
    <b-row>
      <reel-structure
        v-for="(reel, index) in reels"
        :key="index"
        :url="reel.url"
        :name="reel.name"
        :avatar="reel.avatar"
        :date="reel.date"
      />
    </b-row>
  </div>
</template>
<script>
import reelStructure from "@/components/reel-structure.vue";
import reelsSuggestions from "@/json/reels.json";

export default {
  name: "reels-view",
  components: {
    reelStructure,
  },
  data() {
    return {
      reels: reelsSuggestions,
    };
  },
  methods: {
    getReels(reels) {
      this.reels = reels;
    },
  },
};
</script>
