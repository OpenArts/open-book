<template>
  <b-col>
    <h4>
      {{ Title }} (<b>{{ postsCount }}</b
      >)
      <b-button
        class="p-0 bg-transparent no-border"
        variant="dark"
        v-b-toggle="collapseId"
      >
        <b-icon :icon="arrowState" font-scale="1.5"></b-icon>
      </b-button>
    </h4>
    <b-collapse
      :id="collapseId"
      :visible="true"
      @shown="isCollapsed = false"
      @hidden="isCollapsed = true"
    >
      <div class="mb-5">
        <div v-for="(post, index) in posts" :key="index">
          <PostStructure :PIDP="post.PID" :obj="postsObj" :list="postsList" />
        </div>
      </div>
    </b-collapse>
  </b-col>
</template>

<script>
import PostStructure from "../structures/post-structure.vue";

export default {
  name: "posts-history",
  components: { PostStructure },
  props: ["posts", "Title", "collapseId", "postsObj", "postsList"],
  data() {
    return {
      isCollapsed: false,
    };
  },
  computed: {
    postsCount() {
      return this.$props.posts.length;
    },
    arrowState() {
      return this.isCollapsed ? "arrow-down" : "arrow-up";
    },
  },
};
</script>

<style>
.no-border {
  border: none;
}
</style>
