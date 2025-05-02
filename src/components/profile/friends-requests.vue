<template>
  <b-col class="min-width mb-2">
    <h4>
      Friendly Requests (<b>{{ requestsCount }}</b
      >)
    </h4>
    <b-list-group>
      <b-list-group-item
        class="d-flex align-items-center"
        v-for="(requester, index) in profile.friendlyRequests"
        :key="index"
      >
        <b-avatar
          :src="avatar(requester.avatar)"
          size="40px"
          class="mr-2"
        ></b-avatar>
        <h6>{{ requester.name }}</h6>
        <div class="ml-auto d-flex">
          <b-button size="sm" variant="danger" class="mr-2"
            ><b-icon icon="X"></b-icon
          ></b-button>

          <b-button size="sm" variant="success" class="d-flex"
            ><b-icon icon="plus"></b-icon><b-icon icon="person"></b-icon
          ></b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
  </b-col>
</template>

<script>
import AllPostsView from "@/views/all-posts-view.vue";

export default {
  name: "friends-requests",
  props: ["profileData"],
  data() {
    return {
      profile: this.profileData,
      requestsCount: this.profileData.friendlyRequests.length,
    };
  },
  methods: {
    avatar: (path) => AllPostsView.methods.getImgPath(path),
  },
};
</script>

<style>
.min-width {
  min-width: 300px;
}
</style>
