<template>
  <b-col class="min-width">
    <h4>
      Followers (<b>{{ followersCount }}</b
      >)
    </h4>
    <b-list-group>
      <b-list-group-item
        class="d-flex align-items-center"
        v-for="(follower, index) in profile.followers"
        :key="index"
      >
        <b-avatar
          :src="avatar(follower.avatar)"
          size="40px"
          class="mr-2"
        ></b-avatar>
        <h6>{{ follower.name }}</h6>
      </b-list-group-item>
    </b-list-group>
  </b-col>
</template>

<script>
import AllPostsView from "@/views/all-posts-view.vue";

export default {
  name: "followers-list",
  props: ["profileData"],
  data() {
    return {
      profile: this.profileData,
      followersCount: this.profileData.followers.length,
    };
  },
  methods: {
    avatar: (path) => AllPostsView.methods.getImgPath(path),
  },
};
</script>
