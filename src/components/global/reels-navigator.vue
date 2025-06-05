<template>
  <b-container>
    <b-row>
      <reelStructure
        v-for="(reel, index) in reels"
        :key="index"
        :discCollapse="`collapse-${index}`"
        :RID="reel.RID"
        :obj="reelsObj"
        :list="reelsList"
      />
    </b-row>
  </b-container>
</template>
<script>
import reelStructure from "@/components/structures/reel-structure.vue";

export default {
  name: "reels-navigator",
  props: ["reels", "reelsObj", "reelsList"],
  components: {
    reelStructure,
  },
};
</script>
