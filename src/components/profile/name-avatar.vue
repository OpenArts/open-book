<template>
  <b-row class="mb-2">
    <b-col cols="12" class="text-center">
      <b-avatar :src="avatar(pAvatar)" size="150px" class="mb-2"></b-avatar>
      <h3 style="color: #fff">{{ pName }}</h3>
    </b-col>
  </b-row>
</template>

<script>
import profile from "@/json/profile.json";
import AllPostsView from "@/views/all-posts-view.vue";
export default {
  name: "name-avatar",
  data() {
    return {
      profile: profile,
      pName: profile.name,
      pAvatar: profile.avatar,
    };
  },
  methods: {
    avatar: (path) => AllPostsView.methods.getImgPath(path),
  },
};
</script>
