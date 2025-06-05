<template>
  <b-container>
    <NameAvatar v-show="!showReelsHistory && !showSavedReels" />
    <b-row v-show="!showReelsHistory && !showSavedReels">
      <FriendsRequests :profile-data="profile" />
      <FriendsList :profile-data="profile" />
    </b-row>
    <!-- Shared -->
    <b-row v-show="!showReelsHistory && !showSavedReels" class="p-0">
      <ReelsHistory
        :reels="profile.reels"
        @toggleReels="
          showReelsHistory = true;
          showSavedReels = false;
        "
        Title="Reels history"
        collapse-id="reelsHistoryCollapse"
      />
    </b-row>
    <b-row
      class="mt-3"
      v-show="!showReelsHistory && !showSavedReels"
      variant="dark"
    >
      <PostsHistory
        :posts="$store.state.profile.posts"
        posts-obj="profile"
        posts-list="posts"
        Title="Posts history"
        collapse-id="postsHistoryCollapse"
      />
    </b-row>
    <!-- Saved -->
    <b-row v-show="!showReelsHistory && !showSavedReels" class="p-0">
      <ReelsHistory
        :reels="saved.reels"
        @toggleReels="
          showSavedReels = true;
          showReelsHistory = false;
        "
        Title="Saved reels"
        collapseId="savedReelsCollapse"
      />
    </b-row>
    <b-row
      class="mt-3"
      v-show="!showReelsHistory && !showSavedReels"
      variant="dark"
    >
      <PostsHistory
        :posts="saved.posts"
        posts-obj="profile"
        posts-list="saved"
        Title="Saved posts"
        collapseId="savedPostsCollapse"
      />
    </b-row>
    <!-- Reels display -->
    <div>
      <b-button
        v-show="showReelsHistory || showSavedReels"
        variant="dark"
        class="bg-transparent fixedelm fixed-top"
        @click="
          showReelsHistory = false;
          showSavedReels = false;
        "
        ><b-icon icon="arrow-left"></b-icon
      ></b-button>
      <!-- reels history display -->
      <ReelsNavigator
        :reels="profile.reels"
        reelsObj="profile"
        reelsList="reels"
        v-show="showReelsHistory"
      />
      <!-- saved reels display -->
      <ReelsNavigator
        :reels="saved.reels"
        reelsObj="profile"
        reelsList="saved"
        v-show="showSavedReels"
      />
    </div>
  </b-container>
</template>

<script>
import NameAvatar from "@/components/profile/name-avatar.vue";
import FriendsRequests from "@/components/profile/friends-requests.vue";
import FriendsList from "@/components/profile/friends-list.vue";
import ReelsHistory from "../components/profile/reels-history.vue";
import PostsHistory from "@/components/profile/posts-history.vue";
import ReelsNavigator from "@/components/global/reels-navigator.vue";

export default {
  name: "profile-view",
  data() {
    return {
      showReelsHistory: false,
      showSavedReels: false,
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    saved() {
      return this.$store.state.profile.saved;
    },
  },
  components: {
    NameAvatar,
    FriendsRequests,
    FriendsList,
    ReelsHistory,
    ReelsNavigator,
    PostsHistory,
  },
};
</script>

<style>
h4 {
  color: #fff;
}
.fixedelm {
  margin-top: 100px;
  margin-left: 100px;
  width: fit-content;
  cursor: pointer;
}
</style>
