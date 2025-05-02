<template>
  <b-container>
    <h4>Reels History ({{ reels.length }})</h4>
    <b-row class="d-flex">
      <b-col
        class="reel"
        v-for="(reel, index) in reels"
        :key="index"
        @click="showReels()"
      >
        <video class="w-100 h-100">
          <source :src="asset(reel.url)" type="video/mp4" />
        </video>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import allPostsView from "@/views/all-posts-view.vue";
import ReelsView from "@/views/reels-view.vue";

export default {
  name: "reels-history",
  props: ["profileData"],
  data() {
    return {
      reels: this.profileData.reels,
    };
  },
  methods: {
    asset: (p) => allPostsView.methods.getImgPath(p),
    showReels() {
      this.reels.forEach((reel) => {
        reel.name = this.profileData.name;
        reel.avatar = this.profileData.avatar;
      });
      ReelsView.methods.getReels(this.reels);
      const link = document.createElement("a");
      link.href = "/reels";
      link.click();
    },
  },
};
</script>
<style lang="scss" scoped>
.reel {
  min-width: 100px;
  max-width: 120px;
  min-height: 120px;
  backdrop-filter: blur(15px);
  background: #ffffff62;
  border: 1px #fff solid;
}
</style>
