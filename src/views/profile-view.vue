<template>
  <b-container>
    <NameAvatar v-show="!showReels" />
    <b-row v-show="!showReels">
      <FriendsRequests :profile-data="profile" />
      <FriendsList :profile-data="profile" />
    </b-row>
    <b-row v-show="!showReels">
      <ReelsHistory :profile-data="profile" @toggleReels="showReels = true" />
    </b-row>
    <b-row class="mt-3" v-show="!showReels">
      <PostsHistory :profile-data="profile" />
    </b-row>
    <div v-show="showReels">
      <b-button
        variant="light"
        class="bg-transparent"
        @click="showReels = false"
        ><b-icon icon="arrow-left"></b-icon
      ></b-button>
      <ReelsView :externalReels="modifyProfileReels()" />
    </div>
  </b-container>
</template>

<script>
import NameAvatar from "@/components/profile/name-avatar.vue";
import FriendsRequests from "@/components/profile/friends-requests.vue";
import FriendsList from "@/components/profile/friends-list.vue";
import ReelsHistory from "../components/profile/reels-history.vue";
import PostsHistory from "@/components/profile/posts-history.vue";
import ReelsView from "@/views/reels-view.vue";
import jsonProfile from "../json/profile.json";

export default {
  name: "profile-view",
  data() {
    return {
      profile: jsonProfile,
      showReels: false,
    };
  },
  methods: {
    ShowReels() {
      return this.showReels;
    },
    modifyProfileReels() {
      return this.profile.reels.map((reel) => {
        return {
          ...reel,
          name: this.profile.name,
          avatar: this.profile.avatar,
        };
      });
    },
  },
  components: {
    NameAvatar,
    FriendsRequests,
    FriendsList,
    ReelsHistory,
    ReelsView,
    PostsHistory,
  },
};
</script>
