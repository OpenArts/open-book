<template>
  <b-container>
    <b-row class="d-flex justify-content-center">
      <b-col cols="12" class="text-center bg-dark mb-5 radius-it p-4">
        <div class="d-flex justify-content-between">
          <h2>Post preview</h2>
          <b-icon
            :icon="icon"
            font-scale="1.6"
            class="bg-dark ml-auto mt-2 cursor-pointer"
            v-b-toggle.ppt
            @click="
              isToggled = !isToggled;
              isToggled ? (icon = 'X') : (icon = 'arrow-down');
            "
          ></b-icon>
        </div>
        <b-collapse id="ppt">
          <div class="mt-5">
            <PostPreview
              @contentUpload="getContent"
              @imgUpload="getImage"
              :name-preview="$store.state.profile.name"
              :avatar-preview="
                $store.getters.asset($store.state.profile.avatar)
              "
            />
          </div>
          <b-button variant="success" @click="uploadPost()"
            ><b-icon icon="upload" font-scale="1.7"></b-icon
          ></b-button>
        </b-collapse>
      </b-col>
      <b-col cols="10" class="text-center bg-dark mb-5 radius-it p-4">
        <div class="d-flex justify-content-between">
          <h2>Reel preview</h2>
          <b-icon
            :icon="Ricon"
            font-scale="1.6"
            class="bg-dark ml-auto mt-2 cursor-pointer"
            v-b-toggle.rpt
            @click="
              isRToggled = !isRToggled;
              isRToggled ? (Ricon = 'X') : (Ricon = 'arrow-down');
            "
          ></b-icon>
        </div>
        <b-collapse id="rpt">
          <div class="mt-5">
            <ReelPreview
              @reelUpload="getReel"
              @discUpload="getDisc"
              :name-preview="$store.state.profile.name"
              :avatar-preview="
                $store.getters.asset($store.state.profile.avatar)
              "
            />
          </div>
          <b-button variant="success" @click="uploadReel()"
            ><b-icon icon="upload" font-scale="1.7"></b-icon
          ></b-button>
        </b-collapse>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import PostPreview from "@/components/structures/post-preview.vue";
import ReelPreview from "@/components/structures/reel-preview.vue";
import { GenerateUniqueID } from "@/utils/helpers.js";
export default {
  name: "upload-view",
  data() {
    return {
      isToggled: false,
      isRToggled: false,
      Ricon: "arrow-down",
      icon: "arrow-down",
      postData: {
        PID: GenerateUniqueID(),
        name: this.$store.state.profile.name,
        avatar: this.$store.state.profile.avatar,
        date: "2025/6/2",
        likeAdded: false,
        likeState: "hand-thumbs-up",
        likes: 0,
        heartAdded: false,
        heartState: "heart",
        hearts: 0,
        saved: true,
        saveState: "trash",
        comments: 0,
        editAble: true,
        images: null,
        content: "",
      },
      reelData: {
        RID: GenerateUniqueID(),
        name: this.$store.state.profile.name,
        avatar: this.$store.state.profile.avatar,
        date: "2008/8/27",
        url: null,
        disc: "",
        likes: 0,
        comments: 0,
        shares: 0,
        likeAdded: false,
        likeIcon: "hand-thumbs-up",
        isFollowing: false,
        saved: true,
        saveState: "trash",
        editAble: true,
      },
    };
  },
  components: {
    PostPreview,
    ReelPreview,
  },
  methods: {
    getContent(content) {
      this.postData.content = content;
    },
    getImage(images) {
      this.postData.images = images;
    },
    uploadPost() {
      if (this.postData.images || this.postData.content) {
        this.$store.commit("upload", { data: this.postData, type: "post" });
      }
    },
    uploadReel() {
      if (this.reelData.url) {
        this.$store.commit("upload", { data: this.reelData, type: "reel" });
      }
    },
    getReel(reel) {
      this.reelData.url = reel;
    },
    getDisc(disc) {
      console.log("getDisc():", disc);
      this.reelData.disc = disc;
    },
  },
};
</script>

<style scoped>
* {
  color: #fff;
}
.radius-it {
  border-radius: 25px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
