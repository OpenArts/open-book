<template>
  <b-card class="mb-3 dark-theme">
    <b-card-header class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <b-avatar :src="avatar" class="mr-3"></b-avatar>
        <div>
          <h6 class="mb-0">{{ pflName }}</h6>
          <small class="text-muted">{{ pstDate }}</small>
        </div>
      </div>
    </b-card-header>
    <b-card-body>
      <p v-html="pstContent"></p>
    </b-card-body>
    <b-card-footer>
      <div class="buttons-wrapper">
        <!-- "Like" button always visible -->
        <b-button variant="dark" class="like-btn">
          <b-icon icon="heart" font-scale="1.5" variant="danger"></b-icon>
        </b-button>
        <!-- Extra buttons that appear on hover -->
        <div class="extra-btns">
          <b-button variant="dark">
            <b-icon
              icon="hand-thumbs-up"
              font-scale="1.5"
              variant="primary"
            ></b-icon>
          </b-button>
          <b-button variant="dark">
            <b-icon icon="share" variant="light" font-scale="1.5"></b-icon>
          </b-button>
          <b-button variant="dark">
            <b-icon icon="save" font-scale="1.5" variant="light"></b-icon>
          </b-button>
          <b-button size="sm" class="mb-1 mr-1" variant="dark">
            <b-icon icon="facebook" variant="primary" font-scale="2"></b-icon>
          </b-button>
          <b-button size="sm" variant="dark" class="mb-1 mr-1">
            <b-icon icon="youtube" variant="danger" font-scale="2"></b-icon>
          </b-button>
        </div>
      </div>
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  name: "post-structure",
  props: ["pflName", "avatar", "pstDate", "pstContent"],
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
</style>
