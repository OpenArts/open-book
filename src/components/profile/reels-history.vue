<template>
  <b-col>
    <h4>
      {{ Title }} ({{ reels.length }})
      <b-button
        class="p-0 bg-transparent no-border"
        variant="dark"
        v-b-toggle="collapseId"
        ><b-icon :icon="arrowState" font-scale="1.5"></b-icon
      ></b-button>
    </h4>
    <b-collapse
      :id="collapseId"
      :visible="true"
      @shown="isCollapse = false"
      @hidden="isCollapse = true"
    >
      <b-row class="ml-auto">
        <b-col
          class="reel"
          v-for="(reel, index) in reels"
          :key="index"
          @click="openReelsNavigator()"
        >
          <video class="w-100 h-100">
            <source :src="$store.getters.asset(reel.url)" type="video/mp4" />
          </video>
        </b-col>
      </b-row>
    </b-collapse>
  </b-col>
</template>

<script>
export default {
  name: "reels-history",
  props: ["reels", "Title", "collapseId"],
  data() {
    return {
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
    openReelsNavigator() {
      this.$emit("toggleReels", true); // send event to parent component to update show reels
    },
  },
};
</script>

<style lang="scss" scoped>
.reel {
  min-width: 100px;
  max-width: 120px;
  min-height: 120px;
  background: #707070;
  border: 4px #000 dashed;
  cursor: pointer;
}
</style>
