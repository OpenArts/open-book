<template>
  <b-col>
    <h4>
      Posts History (<b>{{ postsCount }}</b
      >)
      <!-- استخدام v-b-toggle لربط الزر مباشرةً بالمكوّن بنية collapse -->
      <b-button
        class="p-0 bg-transparent no-border"
        variant="light"
        v-b-toggle.collapsePostsHistory
      >
        <b-icon :icon="arrowState" font-scale="1.5"></b-icon>
      </b-button>
    </h4>
    <!-- استبدال v-show ب b-collapse وتعيين الحالة الابتدائية باستخدام :visible -->
    <b-collapse
      id="collapsePostsHistory"
      :visible="true"
      @shown="isCollapsed = false"
      @hidden="isCollapsed = true"
    >
      <b-list-group>
        <b-list-group-item v-for="(post, index) in profile.posts" :key="index">
          <PostStructure
            :pfl-name="profile.name"
            :avatar="avatar(profile.avatar)"
            :pst-date="post.date"
            :pst-content="post.content"
          />
        </b-list-group-item>
      </b-list-group>
    </b-collapse>
  </b-col>
</template>

<script>
import allPostsView from "@/views/all-posts-view.vue";
import PostStructure from "../post-structure.vue";

export default {
  name: "posts-history",
  components: { PostStructure },
  props: ["profileData"],
  data() {
    return {
      profile: this.profileData,
      postsCount: this.profileData.posts.length,
      // الحالة الابتدائية: القائمة معروضة لذا isCollapsed = false
      isCollapsed: false,
    };
  },
  computed: {
    // يعكس السهم حالة المكون:
    // إذا كانت القائمة مخفية (isCollapsed true) يظهر السهم لأسفل
    // وإذا كانت القائمة معروضة (isCollapsed false) يظهر السهم لأعلى
    arrowState() {
      return this.isCollapsed ? "arrow-down" : "arrow-up";
    },
  },
  methods: {
    avatar(path) {
      return allPostsView.methods.getImgPath(path);
    },
  },
};
</script>

<style>
.no-border {
  border: none;
}
</style>
