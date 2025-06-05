<template>
  <b-card class="mb-3 dark-theme">
    <b-card-header class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <b-avatar :src="avatarPreview" class="mr-3"></b-avatar>
        <div>
          <h6 class="mb-0">{{ namePreview }}</h6>
        </div>
      </div>
    </b-card-header>

    <b-card-body>
      <p
        contenteditable
        ref="cp"
        class="text-left limed"
        @input="updateContent"
      >
        Write here...
      </p>
      <div v-if="images.length > 0" class="imgPreview">
        <div :class="{ 'image-grid': true, single: images.length === 1 }">
          <div
            v-for="(image, index) in displayImages"
            :key="index"
            class="imgBorder"
          >
            <img :src="image" alt="Image preview" class="img-custom" />
            <div class="remove-btn" @click.stop="removeImageAt(index)">
              <b-icon icon="X" font-scale="1.2" variant="light"></b-icon>
            </div>
            <div
              v-if="!showAllImages && images.length > 2 && index === 1"
              class="overlay additional-overlay"
              @click="toggleShowAll"
            >
              <div class="overlay-text">+{{ images.length - 2 }}</div>
              <div class="remove-btn" @click.stop="removeImageAt(index)">
                <b-icon icon="X" font-scale="1.2" variant="light"></b-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-card-body>

    <b-card-footer>
      <b-button size="md" variant="primary" class="btn-upload">
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
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  name: "post-preview",
  props: ["namePreview", "avatarPreview"],
  data() {
    return {
      images: [],
      showAllImages: false,
    };
  },
  computed: {
    displayImages() {
      if (!this.showAllImages && this.images.length > 2) {
        return this.images.slice(0, 2);
      }
      return this.images;
    },
  },
  methods: {
    removeImageAt(index) {
      this.images.splice(index, 1);
      this.$refs.imgInp.value = null;
    },
    updateContent() {
      const content = this.$refs.cp.innerHTML;
      this.$emit("contentUpload", content);
      console.log(content);
    },
    uploadImage(e) {
      const files = e.target.files;
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
      this.$emit("imgUpload", this.images);
    },
    toggleShowAll() {
      this.showAllImages = !this.showAllImages;
    },
  },
};
</script>

<style scoped lang="scss">
.limed {
  border: double limegreen 5px;
}
.imgPreview {
  border: dashed #fff 3px;
  border-radius: 12px;
  padding: 25px;
  width: 100%;
}
.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}
.image-grid.single {
  grid-template-columns: 1fr;
}
.imgBorder {
  position: relative;
  width: 100%;
  height: 200px;
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
}
.remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 5;
  display: none;
  cursor: pointer;
}
.imgBorder:hover .remove-btn {
  display: block;
}
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
