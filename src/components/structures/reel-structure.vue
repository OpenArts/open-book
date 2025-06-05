<template>
  <b-col class="d-flex justify-content-center p-0 mb-3" cols="12">
    <div class="reel w-md-25">
      <!-- Discription -->
      <div
        v-b-toggle="discCollapse"
        class="display-disc text-center"
        v-show="controls"
      >
        <b-icon font-scale="1.7" icon="type"></b-icon>
      </div>
      <div class="disc">
        <b-collapse :id="discCollapse" v-show="controls">
          <p
            v-html="getDiscShortcut"
            @click="!turn_into_edit_mode ? (allDisc = !allDisc) : void 0"
            @dblclick="allDisc = !allDisc"
            :contenteditable="turn_into_edit_mode"
            ref="newDisc"
            class="p-1"
          ></p>
        </b-collapse>
      </div>
      <!-- Video -->
      <video :controls="controls" class="w-100 h-100">
        <source
          :src="url.length > 100 ? url : $store.getters.asset(url)"
          type="video/mp4"
        />
      </video>
      <!-- Reactions -->
      <div class="reactions ml-1">
        <div
          class="reaction text-center like-btn"
          v-show="controls"
          @click="addLike()"
        >
          <b-icon
            :icon="likeIcon"
            font-scale="2"
            :variant="likeAdded ? 'primary' : 'light'"
          ></b-icon>
          <span>{{ likes }}</span>
        </div>
        <div class="reaction text-center" v-show="controls">
          <b-icon icon="reply" font-scale="1.7" variant="light"></b-icon>
          <span>{{ comments }}</span>
        </div>
        <div class="reaction text-center" v-show="controls">
          <b-icon icon="share" font-scale="1.7" variant="light"></b-icon>
          <span>{{ shares }}</span>
        </div>
        <div
          class="reaction text-center"
          v-show="controls"
          @click="chooseChoise(saved)"
        >
          <b-icon
            :icon="saveState"
            font-scale="1.7"
            :variant="saved ? 'danger' : 'light'"
          ></b-icon>
        </div>
        <div
          size="sm"
          class="mb-1 mr-1 reaction"
          v-if="editAble"
          @click="edit()"
        >
          <b-icon
            :icon="edit_mode_icon"
            variant="light"
            font-scale="1.5"
          ></b-icon>
        </div>
        <div
          size="sm"
          class="mb-1 mr-1 reaction"
          v-if="editAble && turn_into_edit_mode"
          @click="back()"
        >
          <b-icon icon="arrow-right" variant="light" font-scale="1.5"></b-icon>
        </div>
        <div class="reaction p-0" @click="controls = !controls">
          <b-icon icon="square" font-scale="1.7" variant="light"></b-icon>
        </div>
      </div>
      <!-- Publisher Info -->
      <div id="publisher-info" class="d-flex align-items-center mr-2">
        <b-button
          variant="light"
          class="flw-btn ml-auto mr-2"
          v-show="controls"
          @click="followCheck()"
        >
          {{ isFollowing ? "Following" : "Follow" }}
        </b-button>

        <div class="mr-1 h-100" v-show="controls">
          <h5 @click="allName = !allName">
            {{ getNameShortcut }}
          </h5>
          <small>{{ date }}</small>
        </div>

        <b-avatar
          :src="$store.getters.asset(avatar)"
          size="md"
          v-show="controls"
        ></b-avatar>
      </div>
    </div>
  </b-col>
</template>

<script>
export default {
  name: "reel-structure",
  props: ["RID", "obj", "list", "discCollapse", "newReelData"],
  data() {
    return {
      allName: false,
      allDisc: false,
      controls: true,
      turn_into_edit_mode: false,
      edit_mode_icon: "pen",
      new_disc: this.$store.getters.getReelPropByRID(
        this.RID,
        this.obj,
        this.list,
        "disc"
      ),
    };
  },
  mounted() {
    console.log(this.url);
    console.log(this.disc);
  },
  computed: {
    name() {
      return this.$store.getters.getReelPropByRID(
        this.RID,
        this.obj,
        this.list,
        "name"
      );
    },
    url() {
      return this.$store.getters.getReelPropByRID(
        this.RID,
        this.obj,
        this.list,
        "url"
      );
    },
    avatar() {
      return this.$store.getters.getReelPropByRID(
        this.RID,
        this.obj,
        this.list,
        "avatar"
      );
    },
    date() {
      return this.$store.getters.getReelPropByRID(
        this.RID,
        this.obj,
        this.list,
        "date"
      );
    },
    disc() {
      if (this.newReelData) return this.newReelData.disc;
      return this.$store.getters.getReelPropByRID(
        this.RID,
        this.obj,
        this.list,
        "disc"
      );
    },
    likes() {
      return this.$store.getters.getReelPropByRID(
        this.RID,
        this.obj,
        this.list,
        "likes"
      );
    },
    comments() {
      return this.$store.getters.getReelPropByRID(
        this.RID,
        this.obj,
        this.list,
        "comments"
      );
    },
    shares() {
      return this.$store.getters.getReelPropByRID(
        this.RID,
        this.obj,
        this.list,
        "shares"
      );
    },
    likeAdded() {
      return this.$store.getters.getReelPropByRID(
        this.RID,
        this.obj,
        this.list,
        "likeAdded"
      );
    },
    likeIcon() {
      return this.$store.getters.getReelPropByRID(
        this.RID,
        this.obj,
        this.list,
        "likeIcon"
      );
    },
    isFollowing() {
      return this.$store.getters.getReelPropByRID(
        this.RID,
        this.obj,
        this.list,
        "isFollowing"
      );
    },
    saved() {
      return this.$store.getters.getReelPropByRID(
        this.RID,
        this.obj,
        this.list,
        "saved"
      );
    },
    saveState() {
      return this.$store.getters.getReelPropByRID(
        this.RID,
        this.obj,
        this.list,
        "saveState"
      );
    },
    editAble() {
      return this.$store.getters.getReelPropByRID(
        this.RID,
        this.obj,
        this.list,
        "editAble"
      );
    },
    getNameShortcut() {
      if (this.allName) return this.name;
      if (this.name && this.name.length > 10) {
        return this.name.slice(0, 7) + "...";
      }
      return this.name;
    },
    getDiscShortcut() {
      if (this.allDisc) return this.disc;
      if (this.disc && this.disc.length > 30) {
        return (
          this.disc.slice(0, 29) + ` <b style="color: grey">...Show more</b>`
        );
      }
      return this.disc;
    },
  },
  methods: {
    followCheck() {
      this.$store.commit("updateProp", {
        searchingFor: "reel",
        ID: this.RID,
        property: "isFollowing",
        value: !this.isFollowing,
      });
    },
    addLike() {
      if (this.likeAdded) {
        this.$store.commit("updateProp", {
          searchingFor: "reel",
          ID: this.RID,
          property: "likes",
          value: this.likes - 1,
        });
        this.$store.commit("updateProp", {
          searchingFor: "reel",
          ID: this.RID,
          property: "likeIcon",
          value: "hand-thumbs-up",
        });
      } else {
        this.$store.commit("updateProp", {
          searchingFor: "reel",
          ID: this.RID,
          property: "likes",
          value: this.likes + 1,
        });
        this.$store.commit("updateProp", {
          searchingFor: "reel",
          ID: this.RID,
          property: "likeIcon",
          value: "hand-thumbs-up-fill",
        });
      }
      this.$store.commit("updateProp", {
        searchingFor: "reel",
        ID: this.RID,
        list: this.list,
        property: "likeAdded",
        value: !this.likeAdded,
      });
    },
    collectComputedProperties() {
      const computedKeys = Object.keys(this.$options.computed || {});
      const data = {};
      computedKeys.forEach((key) => {
        if (key == "getNameShortcut" || key == "getDiscShortcut") return;
        data[key] = this[key];
      });
      return data;
    },
    saveReelData() {
      this.$store.commit("updateProp", {
        searchingFor: "reel",
        ID: this.RID,
        property: "saveState",
        value: "trash",
      });
      this.$store.commit("updateProp", {
        searchingFor: "reel",
        ID: this.RID,
        property: "saved",
        value: true,
      });
      const reelData = { ...this.collectComputedProperties(), RID: this.RID };
      console.log("At <Reel Struecture /> At <Reels View />", reelData);

      this.$store.commit("saveReel", { reel: reelData });
    },
    deleteReelData() {
      this.$store.commit("updateProp", {
        searchingFor: "reel",
        ID: this.RID,
        property: "saveState",
        value: "save",
      });
      this.$store.commit("updateProp", {
        searchingFor: "reel",
        ID: this.RID,
        property: "saved",
        value: false,
      });
      this.$store.commit("deleteReel", { RID: this.RID });
    },
    chooseChoise(sure) {
      if (sure) {
        this.deleteReelData();
      } else this.saveReelData();
    },
    edit() {
      const p = this.$refs.newDisc;
      if (!this.turn_into_edit_mode) {
        this.turn_into_edit_mode = true;
        this.edit_mode_icon = "save-fill";
        p.style.cssText = "border: lime 4px double;";
      } else {
        this.new_disc = p.textContent;
        this.$store.commit("updateProp", {
          searchingFor: "reel",
          ID: this.RID,
          property: "disc",
          value: this.new_disc,
        });
        this.turn_into_edit_mode = false;
        this.edit_mode_icon = "pen";
        p.style.border = "none";
      }
    },
    back() {
      const p = this.$refs.newDisc;
      this.turn_into_edit_mode = false;
      this.edit_mode_icon = "pen";
      p.innerHTML = this.disc;
      p.style.border = "none";
    },
  },
};
</script>

<style lang="scss" scoped>
.reel {
  position: relative;
  min-width: 20%;
  height: 85vh;
  background: #5c5b5b48;
  border: 1px solid #000;
  border-radius: 10px;
  video {
    border-radius: 10px;
    -o-object-fit: none;
    -o-object-position: center;
    object-fit: cover;
    object-position: center;
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
    color: #fff;
    cursor: pointer;
  }
  .extra-buttons {
    opacity: 0;
  }
}

#publisher-info {
  position: relative;
  z-index: 1;
  bottom: 110px;
  margin-left: auto;
  width: fit-content;
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
.display-disc {
  position: absolute;
  z-index: 13;
  left: 47%;
  top: 5px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  border: #fff 1px solid;
  backdrop-filter: blur(30px);
  * {
    color: #fff;
  }
}
.disc {
  width: 100%;
  max-height: 80vh;
  position: absolute;
  z-index: 12;
  top: 45px;
  border-radius: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  backdrop-filter: blur(30px);
  box-shadow: #00000088 0 10px 20px;
  p {
    color: #fff;
    margin: 0;
  }
}

@media screen and (max-width: 767px) {
  .reel {
    width: 100%;
    height: 90vh;
  }
  .disc {
    width: 100%;
  }
  .reactions {
    bottom: 100px;
  }
}
</style>
