<template>
  <b-container>
    <b-row>
      <reelStructure
        v-for="(reel, index) in reels || suggestions.reels"
        :key="index"
        :url="reel.url"
        :name="reel.name"
        :avatar="reel.avatar"
        :date="reel.date"
        :disc="reel.disc"
      />
    </b-row>
  </b-container>
</template>
<script>
import reelStructure from "@/components/reel-structure.vue";
import suggestions from "@/json/suggestions.json";

export default {
  name: "reels-view",
  props: ["externalReels"],
  components: {
    reelStructure,
  },
  data() {
    return {
      reels: this.externalReels ? this.externalReels : suggestions.reels,
    };
  },
};
</script>
