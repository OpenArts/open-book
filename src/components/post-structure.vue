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
        <!-- زر Like ظاهر دائماً -->
        <b-button variant="dark" class="like-btn">
          <b-icon icon="heart" font-scale="1.5" variant="danger"></b-icon>
        </b-button>
        <!-- باقي الأزرار تظهر عند تحويم المؤشر على المنطقة -->
        <div class="extra-btns">
          <b-button variant="dark">
            <b-icon
              icon="emoji-angry"
              font-scale="1.5"
              class="angry lined"
            ></b-icon>
          </b-button>
          <b-button variant="dark">
            <b-icon icon="emoji-frown" font-scale="1.5" class="sad"></b-icon>
          </b-button>
          <b-button variant="dark">
            <b-icon
              icon="emoji-laughing"
              font-scale="1.5"
              variant="warning"
            ></b-icon>
          </b-button>
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

<style lang="scss" scoped>
@import "@/scss/backgrounds.scss";

/* تطبيق مظهر داكن دائم على الكارت */
.dark-theme {
  background-color: #343a40 !important;
  color: #fff;
}
.dark-theme .b-card-header,
.dark-theme .b-card-body,
.dark-theme .b-card-footer {
  background-color: #343a40 !important;
  border-color: #343a40;
}

/* تنظيم منطقة الأزرار */
.buttons-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* زر Like ظاهر دومًا */
.like-btn {
  /* يمكن تعديل حجم أو مظهر الزر هنا إن رغبت */
}

/* إخفاء باقي الأزرار افتراضيًا مع تأثير انتقال بطيء */
.extra-btns {
  display: flex;
  align-items: center;
  opacity: 0;
  transition: opacity 0.5s ease;
  margin-left: 10px;
}

/* عند تحويم المؤشر على منطقة الأزرار، تظهر باقي الأزرار ببطء */
.buttons-wrapper:hover .extra-btns {
  opacity: 1;
}

/* بعض التنسيقات للأيقونات الخاصة */
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
