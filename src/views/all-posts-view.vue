<template>
  <b-container class="w-100 ml-0">
    <div v-for="(post, index) in posts" :key="index">
      <post-structure
        :pfl-name="post.name"
        :avatar="getImgPath(post.avatar)"
        :pst-date="post.date"
        :pst-content="post.content"
      />
    </div>
  </b-container>
</template>

<script>
import postStructure from "@/components/post-structure.vue";
import suggestions from "@/json/suggestions.json";

export default {
  name: "all-posts-view",
  components: {
    postStructure,
  },
  data() {
    return {
      posts: suggestions.posts,
    };
  },
  methods: {
    getImgPath(img) {
      try {
        return require(`@/${img}`);
      } catch (error) {
        console.error(`Image not found: ${img}`);
      }
    },
  },
};
</script>
