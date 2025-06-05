<template>
  <b-container class="w-100 ml-0">
    <div v-for="(post, index) in $store.state.suggestions.posts" :key="index">
      <post-structure :PIDP="post.PID" obj="suggestions" list="posts" />
    </div>
  </b-container>
</template>

<script>
import postStructure from "@/components/structures/post-structure.vue";

export default {
  name: "all-posts-view",
  components: {
    postStructure,
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
