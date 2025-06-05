<template>
  <b-col class="min-width mb-2">
    <h4>
      Friendly Requests (<b>{{ requestsCount }}</b
      >)
      <b-button
        class="p-0 bg-transparent no-border"
        variant="dark"
        v-b-toggle.collapseFriendsRequests
        ><b-icon :icon="arrowState" font-scale="1.5"></b-icon
      ></b-button>
    </h4>
    <b-collapse
      id="collapseFriendsRequests"
      :visible="true"
      @shown="isCollapsed = false"
      @hidden="isCollapsed = true"
    >
      <b-list-group>
        <b-list-group-item
          class="d-flex align-items-center"
          v-for="(requester, index) in profile.friendlyRequests"
          :key="index"
          variant="dark"
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
    </b-collapse>
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
      isCollapsed: false,
    };
  },
  computed: {
    arrowState() {
      return this.isCollapsed ? "arrow-down" : "arrow-up";
    },
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
