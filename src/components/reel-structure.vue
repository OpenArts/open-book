<template>
  <b-col class="d-flex justify-content-center p-0 mb-3" cols="12">
    <div class="reel w-sm-25">
      <video :controls="controls" class="w-100 h-100">
        <source :src="asset(url)" type="video/mp4" />
      </video>
      <div class="reactions ml-1">
        <b-button
          variant="dark"
          class="reaction"
          v-show="controls"
          @click="addLike()"
        >
          <b-icon
            icon="hand-thumbs-up"
            font-scale="2"
            :variant="likeColor"
          ></b-icon>
          <span>{{ likes }}</span>
        </b-button>
        <b-button variant="dark" class="reaction" v-show="controls">
          <b-icon icon="reply" font-scale="1.7" variant="light"></b-icon>
          <span>{{ comments }}</span>
        </b-button>
        <b-button variant="dark" class="reaction" v-show="controls">
          <b-icon icon="share" font-scale="1.7" variant="light"></b-icon>
          <span>{{ shares }}</span>
        </b-button>
        <b-button variant="dark" class="reaction" v-show="controls">
          <b-icon icon="save" font-scale="1.7" variant="light"></b-icon>
        </b-button>
        <b-button
          variant="dark"
          class="reaction p-0"
          @click="controls = !controls"
        >
          <b-icon icon="square" font-scale="1.7" variant="light"></b-icon>
        </b-button>
      </div>
      <div id="publisher-info" class="d-flex align-items-center">
        <b-button
          variant="light"
          class="flw-btn ml-auto mr-2"
          v-show="controls"
          @click="isFollowing = !isFollowing"
          >{{ isFollowing ? "Following" : "Follow" }}</b-button
        >

        <div class="mr-1" v-show="controls">
          <h5
            class="m-0"
            @click="
              fullName
                ? ((nameShortcut = getNameShortcut(name)), (fullName = false))
                : ((nameShortcut = name), (fullName = true))
            "
          >
            {{ nameShortcut }}
          </h5>
          <small>{{ date }}</small>
        </div>

        <b-avatar :src="asset(avatar)" size="md" v-show="controls"></b-avatar>
      </div>
      <div v-html="disc"></div>
    </div>
  </b-col>
</template>

<script>
import allPostsView from "@/views/all-posts-view.vue";

export default {
  name: "reel-structure",
  props: ["name", "url", "avatar", "date", "disc"],
  data() {
    return {
      likes: 0,
      comments: 0,
      shares: 0,
      likeAdded: false,
      likeColor: "light",
      fullName: false,
      controls: true,
      isFollowing: false,
      nameShortcut: this.getNameShortcut(this.name),
    };
  },
  methods: {
    asset: (path) => allPostsView.methods.getImgPath(path),
    getNameShortcut(name) {
      if (name.length > 10) {
        return name.slice(0, 7) + "...";
      } else return name;
    },
    addLike() {
      if (this.likeAdded) {
        this.likes--;
        this.likeAdded = false;
        this.likeColor = "light";
      } else {
        this.likes++;
        this.likeAdded = true;
        this.likeColor = "primary";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.reel {
  width: 35%;
  height: 85vh;
  background: #5c5b5b48;
  border: #000 1px solid;
  border-radius: 10px;
  video {
    border-radius: 10px;
  }
}
@media (max-width: 960px) {
  .reel {
    width: 100%;
    height: 90vh;
  }
}
.reactions {
  position: absolute;
  z-index: 2;
  bottom: 55px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  .reaction {
    border: none;
    background: transparent;
    display: flex;
    flex-direction: column;
    padding: 0;
  }
}
#publisher-info {
  position: relative;
  z-index: 1;
  bottom: 110px;
  * {
    color: #fff;
  }
  .flw-btn {
    background: transparent;
  }
  small {
    font-size: smaller;
    margin-right: 0;
  }
}
</style>
