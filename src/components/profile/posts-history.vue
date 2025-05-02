<template>
  <b-col>
    <h4>
      Posts History (<b>{{ postsCount }}</b
      >)
    </h4>
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
  </b-col>
</template>
<script>
import allPostsView from "@/views/all-posts-view.vue";
import PostStructure from "../post-structure.vue";

export default {
  name: "posts-history",
  components: {
    PostStructure,
  },
  props: ["profileData"],
  data() {
    return {
      profile: this.profileData,
      postsCount: this.profileData.posts.length,
    };
  },
  methods: {
    avatar: (path) => allPostsView.methods.getImgPath(path),
  },
};
</script>
