<template>
  <b-col class="min-width mb-2">
    <h4>
      Friends (<b>{{ friendsCount }}</b
      >)
      <!-- باستخدام توجيه v-b-toggle لربط الزر بالـ b-collapse عبر المعرف -->
      <b-button
        v-b-toggle.collapseFriends
        class="p-0 bg-transparent no-border"
        variant="dark"
      >
        <!-- يتم احتساب السهم بناءً على حالة الـ collapse -->
        <b-icon :icon="collapseArrow" font-scale="1.5"></b-icon>
      </b-button>
    </h4>
    <!-- استخدام b-collapse مع المعرف المرتبط بالزر -->
    <b-collapse
      id="collapseFriends"
      :visible="true"
      @shown="onCollapseShown"
      @hidden="onCollapseHidden"
    >
      <b-list-group>
        <b-list-group-item
          class="d-flex align-items-center"
          v-for="(friend, index) in profile.friends"
          :key="index"
          variant="dark"
        >
          <b-avatar
            :src="avatar(friend.avatar)"
            size="40px"
            class="mr-2"
          ></b-avatar>
          <h6>{{ friend.name }}</h6>
          <b-button size="sm" variant="danger" class="ml-auto">
            <b-icon icon="X"></b-icon>
          </b-button>
        </b-list-group-item>
      </b-list-group>
    </b-collapse>
  </b-col>
</template>

<script>
import AllPostsView from "@/views/all-posts-view.vue";

export default {
  name: "friends-list",
  props: ["profileData"],
  data() {
    return {
      profile: this.profileData,
      friendsCount: this.profileData.friends.length,
      // تعريف حالة القائمة: false أي أنها مفتوحة في البداية
      isCollapsed: false,
    };
  },
  computed: {
    // إذا كانت القائمة مفتوحة (isCollapsed === false) نُظهر سهم يشير للأعلى للإشارة
    // بأن الضغط سيؤدي لإخفائها، والعكس صحيح
    collapseArrow() {
      return this.isCollapsed ? "arrow-down" : "arrow-up";
    },
  },
  methods: {
    // عند ظهور القائمة يتم تعديل الحالة بحيث تعكس أنها مفتوحة
    onCollapseShown() {
      this.isCollapsed = false;
    },
    // عند إخفاء القائمة يتم تعديل الحالة بحيث تعكس أنها مخفية
    onCollapseHidden() {
      this.isCollapsed = true;
    },
    avatar(path) {
      return AllPostsView.methods.getImgPath(path);
    },
  },
};
</script>

<style>
.no-border * {
  border: none;
}
</style>
