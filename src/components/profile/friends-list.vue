<template>
  <b-col class="min-width mb-2">
    <h4>
      Friends (<b>{{ friendsCount }}</b
      >)
    </h4>
    <b-list-group>
      <b-list-group-item
        class="d-flex align-items-center"
        v-for="(friend, index) in profile.friends"
        :key="index"
      >
        <b-avatar
          :src="avatar(friend.avatar)"
          size="40px"
          class="mr-2"
        ></b-avatar>
        <h6>{{ friend.name }}</h6>
        <b-button size="sm" variant="danger" class="ml-auto"
          ><b-icon icon="X"></b-icon
        ></b-button>
      </b-list-group-item>
    </b-list-group>
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
    };
  },
  methods: {
    avatar: (path) => AllPostsView.methods.getImgPath(path),
  },
};
</script>
