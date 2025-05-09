<template>
  <b-container class="w-100 main py-4">
    <b-row class="justify-content-center mb-4">
      <b-col cols="12" md="8">
        <div class="search-box p-3">
          <b-input-group>
            <b-form-input
              placeholder="Search here..."
              v-model="searchValue"
              class="bg-transparent text-white"
            ></b-form-input>
          </b-input-group>
        </div>
      </b-col>
    </b-row>

    <!-- Category Selection Buttons -->
    <b-row class="justify-content-center mb-4">
      <b-col cols="12" md="8" class="text-center">
        <b-button-group>
          <b-button variant="outline-light" @click="all = true">All</b-button>
          <b-button
            variant="outline-light"
            @click="
              all = false;
              users = true;
              posts = false;
              reels = false;
            "
          >
            Users
          </b-button>
          <b-button
            variant="outline-light"
            @click="
              all = false;
              posts = true;
              reels = false;
              users = false;
            "
          >
            Posts
          </b-button>
          <b-button
            variant="outline-light"
            @click="
              all = false;
              reels = true;
              users = false;
              posts = false;
            "
          >
            Reels
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>

    <!-- Static Sections without Default Data -->
    <b-row class="d-flex justify-content-center mb-4">
      <b-col cols="12" md="8">
        <!-- Users Section -->
        <h4 class="mb-3" v-show="all || users">Users</h4>
        <div class="mb-5 text-center" v-show="all || users">
          <template v-if="highlightedUsers.length && !highlightedUsers[0].msg">
            <b-list-group>
              <userStructure
                v-for="(user, index) in highlightedUsers"
                :key="index"
                :name="user.name"
                :avatar="user.avatar"
              />
            </b-list-group>
          </template>
          <small v-else v-html="highlightedUsers[0].msg"></small>
        </div>

        <!-- Posts Section -->
        <h4 class="mb-3" v-show="all || posts">Posts</h4>
        <div class="mb-5 text-center" v-show="all || posts">
          <template v-if="highlightedPosts.length && !highlightedPosts[0].msg">
            <postStructure
              v-for="(post, index) in highlightedPosts"
              :pfl-name="post.name"
              :pst-content="post.content"
              :pst-date="post.date"
              :key="index"
            />
          </template>
          <small v-else v-html="highlightedPosts[0].msg"></small>
        </div>

        <!-- Reels Section -->
        <h4 class="mb-3" v-show="all || reels">Reels</h4>
        <div class="text-center" v-show="all || reels">
          <small>No reels to display.</small>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import postStructure from "@/components/post-structure.vue";
import userStructure from "@/components/user-structure.vue";
import suggestions from "@/json/suggestions.json";
import allPostsView from "./all-posts-view.vue";

export default {
  name: "SearchView",
  data() {
    return {
      suggestions: suggestions,
      searchValue: "",
      all: true,
      users: false,
      posts: false,
      reels: false,
    };
  },
  components: {
    postStructure,
    userStructure,
  },
  watch: {
    searchValue(newValue) {
      if (!newValue.trim()) {
        this.highlightedPosts = this.filteredPosts;
        this.highlightedUsers = this.filteredUsers;
      } else {
        const regex = new RegExp(`(${newValue})`, "gi");

        this.highlightedPosts = this.filteredPosts.map((post) => ({
          ...post,
          content: post.content.replace(
            regex,
            `<span style="background:green;color:#fff;">$1</span>`
          ),
        }));

        this.highlightedUsers = this.filteredUsers.map((user) => ({
          ...user,
          name: user.name.replace(
            regex,
            `<span style="background:green;color:#fff;">$1</span>`
          ),
        }));
      }
    },
  },
  computed: {
    filteredUsers() {
      if (!this.searchValue.trim()) return this.suggestions.users;
      return this.suggestions.users.filter((user) =>
        user.name
          .toLowerCase()
          .trim()
          .includes(this.searchValue.trim().toLowerCase())
      );
    },
    highlightedUsers() {
      if (!this.searchValue.trim()) return this.filteredUsers;
      const matchedUsers = this.filteredUsers.map((user) => {
        const regex = new RegExp(`(${this.searchValue})`, "gi");
        return {
          ...user,
          name: user.name.replace(
            regex,
            `<span style="background:green;color:#fff;">$1</span>`
          ),
        };
      });
      return matchedUsers.length
        ? matchedUsers
        : [{ msg: `No matching users for "${this.searchValue}" to display!` }];
    },
    filteredPosts() {
      const query = this.searchValue.trim().toLowerCase();
      if (!query) return this.suggestions.posts;
      return this.suggestions.posts.filter((post) =>
        post.content.toLowerCase().includes(query)
      );
    },
    highlightedPosts() {
      if (!this.searchValue.trim()) return this.filteredPosts;
      const matchedPosts = this.filteredPosts.map((post) => {
        const regex = new RegExp(`(${this.searchValue})`, "gi");
        return {
          ...post,
          content: post.content.replace(
            regex,
            `<span style="background:green;color:#fff;">$1</span>`
          ),
        };
      });
      return matchedPosts.length
        ? matchedPosts
        : [{ msg: `No matching posts for "${this.searchValue}" to display!` }];
    },
    filteredReels() {
      if (!this.searchValue.trim()) return this.suggestions.reels;
      let matchedReels = this.suggestions.reels.filter((reel) =>
        reel.disc.toLowerCase().includes(this.searchValue.trim().toLowerCase())
      );
      return matchedReels.length
        ? matchedReels
        : [
            {
              msg: `<small>There is no matching reels for "${this.searchValue}" to display!</small>`,
            },
          ];
    },
    asset(path) {
      return allPostsView.methods.getImgPath(path);
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  min-height: 85vh;
  background: #343a40;
  padding: 20px;
  border-radius: 25px;
  color: #fff;
}
small,
h4,
p {
  color: #fff;
}
.search-box {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
}
.search-box .form-control {
  background-color: transparent;
  border: 1px solid #555;
  color: #fff;
}
.b-list-group-item {
  background-color: #454d55 !important;
  color: #fff;
  border: none;
}
</style>
