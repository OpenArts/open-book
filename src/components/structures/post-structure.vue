<template>
  <b-card class="mb-3 dark-theme">
    <b-card-header class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <b-avatar :src="$store.getters.asset(avatar)" class="mr-3"></b-avatar>
        <div>
          <h6 class="mb-0" @click="allName = !allName">
            {{ getNameShortcut }}
          </h6>
          <small class="text-muted">{{ date }}</small>
        </div>
      </div>
    </b-card-header>
    <b-card-body>
      <p
        v-html="getContentShortcut"
        @click="!turn_into_edit_mode ? (allContent = !allContent) : void 0"
        @dblclick="allContent = !allContent"
        :contenteditable="turn_into_edit_mode"
        ref="newContent"
      ></p>
      <!-- Display images if its found -->
      <div class="imgPreview" ref="imagePreview" v-if="images">
        <div :class="{ 'image-grid': true, single: images.length === 1 }">
          <div
            v-for="(image, index) in displayImages"
            :key="index"
            class="imgBorder"
          >
            <img :src="image" alt="Image preview" class="img-custom" />

            <div
              class="remove-btn"
              @click.stop="removeImageAt(index)"
              v-if="editAble && turn_into_edit_mode"
            >
              <b-icon icon="X" font-scale="1.2" variant="light"></b-icon>
            </div>

            <div
              v-show="!showAllImages && images.length > 2 && index === 1"
              class="overlay additional-overlay"
              @click="showAllImages = !showAllImages"
            >
              <div class="overlay-text">+{{ images.length - 2 }}</div>
            </div>
          </div>
        </div>
      </div>
    </b-card-body>
    <b-card-footer>
      <div class="buttons-wrapper">
        <!-- "Like" button always visible -->
        <div
          class="like-btn reaction"
          @click="addReaction('heartAdded', 'heartState', 'heart', 'hearts')"
        >
          <b-icon :icon="heartState" font-scale="1.5" variant="danger"></b-icon>
          <small>{{ hearts }}</small>
        </div>
        <!-- Extra buttons that appear on hover -->
        <div class="extra-btns">
          <div
            class="reaction"
            @click="
              addReaction('likeAdded', 'likeState', 'hand-thumbs-up', 'likes')
            "
          >
            <b-icon
              :icon="likeState"
              font-scale="1.5"
              :variant="likeAdded ? 'primary' : 'light'"
            ></b-icon>
            <small>{{ likes }}</small>
          </div>
          <div class="reaction">
            <b-icon icon="reply" variant="light" font-scale="1.5"></b-icon>
            <small>{{ comments }}</small>
          </div>
          <div class="reaction">
            <b-icon icon="share" variant="light" font-scale="1.5"></b-icon>
            <small>803</small>
          </div>
          <div v-if="saveAble" class="reaction" @click="chooseChoise(saved)">
            <b-icon
              :icon="saveState"
              :variant="saved ? 'danger' : 'light'"
              font-scale="1.5"
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
            <b-icon
              icon="arrow-right"
              variant="light"
              font-scale="1.5"
            ></b-icon>
          </div>
          <b-button
            size="md"
            variant="primary"
            class="btn-upload"
            v-if="editAble && turn_into_edit_mode"
          >
            <b-icon icon="image" font-scale="1.5"></b-icon>
            <input
              type="file"
              ref="imgInp"
              multiple
              @change="uploadImage($event)"
              accept="image/*"
              class="file-input"
            />
          </b-button>
        </div>
      </div>
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  name: "post-structure",
  props: ["PIDP", "obj", "list", "newPostData"],
  data() {
    return {
      allName: false,
      allContent: false,
      showAllImages: false,
      turn_into_edit_mode: false,
      edit_mode_icon: "pen",
      new_content: this.$store.getters.getPostPropByPID(
        this.PIDP,
        this.obj,
        this.list,
        "content"
      ),
      newImages: this.initailizeNewImages(),
    };
  },
  computed: {
    getNameShortcut() {
      if (this.allName) return this.name;
      if (this.name && this.name.length > 10) {
        return this.name.slice(0, 7) + "...";
      }
      return this.name;
    },
    getContentShortcut() {
      if (this.allContent) return this.content;
      if (this.content && this.content.length > 76) {
        return (
          this.content.slice(0, 70) + ` <b style="color: grey">...Show more</b>`
        );
      }
      return this.content;
    },
    saveAble() {
      if (
        this.$store.getters.getPostPropByPID(
          this.PID,
          this.obj,
          this.list,
          "publisherID"
        ) === this.$store.state.profile.id
      ) {
        return false;
      }
      return true;
    },
    images() {
      const imgs = this.$store.getters.getPostPropByPID(
        this.PID,
        this.obj,
        this.list,
        "images"
      );
      return imgs ? imgs : null;
    },
    displayImages() {
      if (!this.showAllImages && this.newImages.length > 2) {
        return this.newImages.slice(0, 2);
      } else {
        return this.newImages;
      }
    },
    editAble() {
      return this.$store.getters.getPostPropByPID(
        this.PID,
        this.obj,
        this.list,
        "editAble"
      );
    },
    avatar() {
      return this.$store.getters.getPostPropByPID(
        this.PID,
        this.obj,
        this.list,
        "avatar"
      );
    },
    PID() {
      return this.$props.PIDP;
    },
    name() {
      return this.$store.getters.getPostPropByPID(
        this.PID,
        this.obj,
        this.list,
        "name"
      );
    },
    content() {
      if (this.newPostData) return this.newPostData.content;
      return this.$store.getters.getPostPropByPID(
        this.PID,
        this.obj,
        this.list,
        "content"
      );
    },
    date() {
      return this.$store.getters.getPostPropByPID(
        this.PID,
        this.obj,
        this.list,
        "date"
      );
    },
    likeAdded() {
      return this.$store.getters.getPostPropByPID(
        this.PID,
        this.obj,
        this.list,
        "likeAdded"
      );
    },
    likes() {
      return this.$store.getters.getPostPropByPID(
        this.PID,
        this.obj,
        this.list,
        "likes"
      );
    },
    likeState() {
      return this.$store.getters.getPostPropByPID(
        this.PID,
        this.obj,
        this.list,
        "likeState"
      );
    },
    heartAdded() {
      return this.$store.getters.getPostPropByPID(
        this.PID,
        this.obj,
        this.list,
        "heartAdded"
      );
    },
    hearts() {
      return this.$store.getters.getPostPropByPID(
        this.PID,
        this.obj,
        this.list,
        "hearts"
      );
    },
    heartState() {
      return this.$store.getters.getPostPropByPID(
        this.PID,
        this.obj,
        this.list,
        "heartState"
      );
    },
    comments() {
      return this.$store.getters.getPostPropByPID(
        this.PID,
        this.obj,
        this.list,
        "comments"
      );
    },
    saved() {
      return this.$store.getters.getPostPropByPID(
        this.PID,
        this.obj,
        this.list,
        "saved"
      );
    },
    saveState() {
      return this.$store.getters.getPostPropByPID(
        this.PID,
        this.obj,
        this.list,
        "saveState"
      );
    },
  },
  methods: {
    initailizeNewImages() {
      const orgImgs = this.$store.getters.getPostPropByPID(
        this.PIDP,
        this.obj,
        this.list,
        "images"
      );
      const clonedImages = orgImgs ? [...orgImgs] : null;
      return clonedImages ? clonedImages : null;
    },
    addReaction(addedProp, recState, defaultState, counter) {
      if (!this[addedProp]) {
        this.$store.commit("updateProp", {
          searchingFor: "post",
          ID: this.PID,
          property: addedProp,
          value: true,
        });
        this.$store.commit("updateProp", {
          searchingFor: "post",
          ID: this.PID,
          property: recState,
          value: `${this[recState]}-fill`,
        });
        this.$store.commit("updateProp", {
          searchingFor: "post",
          ID: this.PID,
          property: counter,
          value: this[counter] + 1,
        });
      } else {
        this.$store.commit("updateProp", {
          searchingFor: "post",
          ID: this.PID,
          property: addedProp,
          value: false,
        });
        this.$store.commit("updateProp", {
          searchingFor: "post",
          ID: this.PID,
          property: recState,
          value: defaultState,
        });
        this.$store.commit("updateProp", {
          searchingFor: "post",
          ID: this.PID,
          property: counter,
          value: this[counter] - 1,
        });
      }
      console.log(this[addedProp]);
    },
    collectComputedProperties() {
      const computedKeys = Object.keys(this.$options.computed || {});
      const data = {};
      computedKeys.forEach((key) => {
        data[key] = this[key];
      });
      return data;
    },
    savePostData() {
      this.$store.commit("updateProp", {
        searchingFor: "post",
        ID: this.PID,
        property: "saveState",
        value: "trash",
      });
      this.$store.commit("updateProp", {
        searchingFor: "post",
        ID: this.PID,
        property: "saved",
        value: true,
      });
      const postData = this.collectComputedProperties();
      this.$store.commit("savePost", { post: postData });
    },
    deletePostData() {
      this.$store.commit("updateProp", {
        searchingFor: "post",
        ID: this.PID,
        property: "saveState",
        value: "save",
      });
      this.$store.commit("updateProp", {
        searchingFor: "post",
        ID: this.PID,
        property: "saved",
        value: false,
      });
      this.$store.commit("deletePost", { PID: this.PID });
    },
    chooseChoise(sure) {
      if (sure) {
        this.deletePostData();
      } else this.savePostData();
    },
    removeImageAt(index) {
      console.log("Before : ", this.newImages);
      this.newImages.splice(index, 1);
      console.log("After : ", this.newImages);
      console.log("images from removeImageAt() : ", this.images);
      console.log("newImages from removeImageAt() : ", this.newImages);
      this.$refs.imgInp.value = null;
    },
    uploadImage(e) {
      const files = e.target.files;
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newImages = [...this.newImages, e.target.result];
          console.log("newImages form uploadImage() : ", this.newImages);
          console.log("images form uploadImage() : ", this.images);
        };
        reader.readAsDataURL(file);
      });
    },
    edit() {
      const p = this.$refs.newContent;
      const i = this.images ? this.$refs.imagePreview : null;
      if (!this.turn_into_edit_mode) {
        this.turn_into_edit_mode = true;
        this.edit_mode_icon = "save-fill";
        p.style.cssText = "border: lime double 4px;";
        this.images ? (i.style.cssText = "border: #fff dashed 3px;") : void 0;
      } else {
        this.new_content = p.textContent;
        this.$store.commit("updateProp", {
          searchingFor: "post",
          ID: this.PID,
          property: "content",
          value: this.new_content,
        });
        this.newImages = [...this.images];
        this.turn_into_edit_mode = false;
        this.edit_mode_icon = "pen";
        p.style.border = "none";
        if (this.images) i.style.cssText = "border: solid #616060 3px;";
      }
    },
    back() {
      const p = this.$refs.newContent;
      const i = this.$refs.imagePreview;
      this.edit_mode_icon = "pen";
      p.innerHTML = this.content;
      p.style.border = "none";
      if (this.images) i.style.cssText = "border: solid #616060 3px;";
      this.images ? (i.style.cssText = "border: solid #616060 3px;") : void 0;
      this.$store.commit("updateProp", {
        searchingFor: "post",
        ID: this.PID,
        property: "images",
        value: this.images,
      });
      this.turn_into_edit_mode = false;
      this.newImages = [...this.images];
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/backgrounds.scss";

/* Dark theme for the component */
.dark-theme {
  background-color: #313438 !important;
  color: #fff;
}

/* Set dark backgrounds for card header, body, and footer */
.dark-theme .b-card-header,
.dark-theme .b-card-body,
.dark-theme .b-card-footer {
  background-color: #343a40 !important;
  border-color: #343a40;
}

/* Styling for button wrapper */
.buttons-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  .reaction {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    cursor: pointer;
  }
}

/* Use deep selector to override button backgrounds inside the component */
::v-deep .buttons-wrapper .btn {
  background: #343a40 !important;
  border-color: #343a40 !important;
}

/* Spacing for the like button */
.like-btn {
  margin-right: 10px;
}

/* Hide extra buttons by default with smooth transition */
.extra-btns {
  display: flex;
  align-items: center;
  opacity: 0;
  transition: opacity 0.5s ease;
  margin-left: 10px;
}

/* Show extra buttons when hovering over the buttons wrapper */
.buttons-wrapper:hover .extra-btns {
  opacity: 1;
}

.imgPreview {
  border: solid #616060 3px;
  border-radius: 12px;
  padding: 25px;
  width: 100%;
}
// Images grid
.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3px;
}
.image-grid.single {
  grid-template-columns: 1fr;
}

.imgBorder {
  position: relative;
  width: 100%;
  height: 275px;
  overflow: hidden;
}
.imgBorder::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(128, 128, 128, 0.2);
  backdrop-filter: blur(3px);
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 1;
}
.imgBorder:hover::after {
  opacity: 1;
}
.img-custom {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 0;
  border-radius: 5px;
}
/* زر إزالة الصورة */
.remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 5;
  display: none;
  cursor: pointer;
}
/* يظهر زر الإزالة عند التحويم */
.imgBorder:hover .remove-btn {
  display: block;
}

/* الطبقة الإضافية على الصورة الثانية في حالة الصور المختصرة */
.additional-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(128, 128, 128, 0.6);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.overlay-text {
  text-align: center;
  color: #fff;
  font-size: 2rem;
}

/* زر رفع الصور: input مخفي وممتد فوق الزر */
.btn-upload {
  position: relative;
  overflow: hidden;
}
.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
