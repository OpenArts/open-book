<template>
  <b-container>
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
  </b-container>
</template>
<script>
import reelStructure from "@/components/reel-structure.vue";
import reelsSuggestions from "@/json/suggestions.json";

export default {
  name: "reels-view",
  components: {
    reelStructure,
  },
  data() {
    return {
      reels: reelsSuggestions.reels,
    };
  },
  methods: {
    getReels(reels) {
      this.reels = reels;
    },
  },
};
</script>
