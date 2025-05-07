<template>
  <b-container>
    <NameAvatar />
    <b-row>
      <FriendsRequests :profile-data="profile" />
      <FriendsList :profile-data="profile" />
    </b-row>
    <b-row>
      <ReelsHistory :profile-data="profile" />
    </b-row>
    <b-row class="mt-3">
      <PostsHistory :profile-data="profile" />
    </b-row>
  </b-container>
</template>

<script>
import NameAvatar from "@/components/profile/name-avatar.vue";
import FriendsRequests from "@/components/profile/friends-requests.vue";
import FriendsList from "@/components/profile/friends-list.vue";
import ReelsHistory from "../components/profile/reels-history.vue";
import PostsHistory from "@/components/profile/posts-history.vue";

import jsonProfile from "../json/profile.json";

export default {
  name: "profile-view",
  data() {
    return {
      profile: jsonProfile,
    };
  },
  components: {
    NameAvatar,
    FriendsRequests,
    FriendsList,
    ReelsHistory,
    PostsHistory,
  },
};
</script>
