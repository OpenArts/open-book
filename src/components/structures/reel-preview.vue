<template>
  <b-col class="d-flex justify-content-center p-0 mb-3 fd-col" cols="12">
    <div class="reel w-md-25">
      <!-- Discription -->
      <div
        v-b-toggle.reelPreviewDiscCollapse
        class="display-disc"
        v-show="reel"
      >
        <b-icon font-scale="1.7" icon="type"></b-icon>
      </div>
      <div class="disc" v-show="reel">
        <b-collapse id="reelPreviewDiscCollapse" visible>
          <p contenteditable ref="rd" @input="disc()">Write here...</p>
        </b-collapse>
      </div>
      <!-- Video -->
      <video controls class="w-100 h-100" v-if="reel">
        <source :src="reel" type="video/mp4" />
      </video>
      <div
        v-else
        class="w-100 h-100 d-flex align-items-center justify-content-center"
      >
        <h3>Upload reel</h3>
      </div>
      <!-- Publisher Info -->
      <div id="publisher-info" class="d-flex align-items-center mr-2">
        <div class="ml-auto d-flex justify-content-between align-items-center">
          <div class="mr-1 h-100" v-show="reel">
            <h5>
              {{ namePreview }}
            </h5>
          </div>
          <b-avatar :src="avatarPreview" size="md" v-show="reel"></b-avatar>
        </div>
      </div>
    </div>
    <div
      class="w-100 h-25 p-3 d-flex justify-content-center align-items-center"
    >
      <b-button class="up-btn" variant="primary">
        <input
          type="file"
          accept="video/*"
          ref="finp"
          @change="uploadReel($event)"
        />
        <div class="d-flex fd-col align-items-center" v-show="!reel">
          <b-icon icon="film" font-scale="1.6"></b-icon>
          <b-icon icon="upload" font-scale="1.2"></b-icon>
        </div>
      </b-button>
    </div>
  </b-col>
</template>

<script>
export default {
  name: "reel-preview",
  props: ["namePreview", "avatarPreview"],
  data() {
    return {
      reel: "",
    };
  },
  methods: {
    disc() {
      const disc = this.$refs.rd.textContent;
      this.$refs.rd.style.textAlign = "left";
      this.$emit("discUpload", disc);
    },
    uploadReel(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          e.target.result ? (this.reel = e.target.result) : (this.reel = false);
          this.$emit("reelUpload", this.reel);
        };
        reader.readAsDataURL(file);
        e.target.files = null;
        return;
      }
      console.error(":( Executing file field !");
      return;
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
    object-fit: cover;
    object-position: center;
    -o-object-fit: cover;
    -o-object-position: center;
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
  bottom: 85px;
  width: fit-content;
  margin-left: auto;
  * {
    color: #fff;
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
  border: #fff 2px solid;
  backdrop-filter: blur(30px);
}
.disc {
  width: 100%;
  max-height: 60vh;
  position: absolute;
  z-index: 12;
  top: 45px;
  border-radius: 10px;
  overflow-y: auto;
  backdrop-filter: blur(30px);
  background: #5e5e5e56;
  box-shadow: #00000088 0 10px 20px;
  p {
    color: #fff;
    margin: 0;
  }
}
.up-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 50px;
    height: fit-content;
    background: #000;
    position: absolute;
    z-index: 30;
    opacity: 0;
  }
}
.fd-col {
  flex-direction: column;
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
