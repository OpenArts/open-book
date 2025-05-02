<template>
  <b-card class="mb-3">
    <b-card-header class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <b-avatar :src="PFLAvatar" class="mr-3"></b-avatar>
        <div>
          <h6 class="mb-0">{{ PFLName }}</h6>
          <small class="text-muted">{{ PSTDate }}</small>
        </div>
      </div>
    </b-card-header>
    <b-card-body>
      <p>{{ PSTContent }}</p>
    </b-card-body>
    <b-card-footer>
      <div>
        <b-button variant="light">
          <b-icon icon="heart" font-scale="1.5" variant="danger"></b-icon>
        </b-button>

        <b-button variant="light">
          <b-icon icon="emoji-angry" font-scale="1.5" class="angry"></b-icon>
        </b-button>

        <b-button variant="light">
          <b-icon icon="emoji-frown" font-scale="1.5" class="sad"></b-icon>
        </b-button>

        <b-button variant="light">
          <b-icon
            icon="emoji-laughing"
            font-scale="1.5"
            variant="warning"
          ></b-icon>
        </b-button>

        <b-button variant="light">
          <b-icon
            icon="hand-thumbs-up"
            font-scale="1.5"
            variant="primary"
          ></b-icon>
        </b-button>

        <b-button variant="light">
          <b-icon icon="share" variant="dark" font-scale="1.5"></b-icon>
        </b-button>

        <b-button variant="light">
          <b-icon icon="save" font-scale="1.5" variant="dark"></b-icon>
        </b-button>

        <b-button size="sm" class="mb-1 mr-1" variant="light">
          <b-icon icon="facebook" variant="primary" font-scale="2"></b-icon>
        </b-button>
        <b-button size="sm" variant="light" class="mb-1 mr-1">
          <b-icon icon="youtube" variant="danger" font-scale="2"></b-icon>
        </b-button>
      </div>
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  name: "post-structure",
  props: ["pfl-name", "avatar", "pst-date", "pst-content"],
  data() {
    return {
      PFLName: this.pflName,
      PFLAvatar: this.avatar,
      PSTDate: this.pstDate,
      PSTContent: this.pstContent,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/backgrounds.scss";
.main {
  background-color: $Main;
}
.angry {
  color: $angry;
}
.angry:hover {
  color: #d10101;
}
.sad {
  color: $sad;
}
.sad:hover {
  color: #000;
}
</style>
