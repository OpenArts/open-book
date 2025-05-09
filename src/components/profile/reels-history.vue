<template>
  <b-col>
    <h4>
      Reels History ({{ reels.length }})
      <b-button
        class="p-0 bg-transparent no-border"
        variant="light"
        v-b-toggle.collapseReels
        ><b-icon :icon="arrowState" font-scale="1.5"></b-icon
      ></b-button>
    </h4>
    <b-collapse
      id="collapseReels"
      :visible="true"
      @shown="isCollapse = false"
      @hidden="isCollapse = true"
    >
      <b-row class="d-flex">
        <b-col
          class="reel"
          v-for="(reel, index) in reels"
          :key="index"
          @click="openReelsView()"
        >
          <video class="w-100 h-100">
            <source :src="asset(reel.url)" type="video/mp4" />
          </video>
        </b-col>
      </b-row>
    </b-collapse>
  </b-col>
</template>

<script>
import allPostsView from "@/views/all-posts-view.vue";

export default {
  name: "reels-history",
  props: ["profileData"],
  data() {
    return {
      reels: this.profileData.reels,
      isCollapse: true,
      showReels: false,
    };
  },
  computed: {
    arrowState() {
      return this.isCollapse ? "arrow-down" : "arrow-up";
    },
  },
  methods: {
    asset: (p) => allPostsView.methods.getImgPath(p),
    openReelsView() {
      this.$emit("toggleReels", true); // إرسال الحدث للأب لتحديث `showReels`
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
  cursor: pointer;
}
</style>
