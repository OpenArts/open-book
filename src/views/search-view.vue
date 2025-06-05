<template>
  <b-container class="main py-4">
    <b-row class="justify-content-center mb-4">
      <b-col cols="12" md="8">
        <div class="search-box p-3">
          <b-input-group>
            <b-form-input
              placeholder="Search here..."
              v-model="searchQuery"
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

    <b-row class="d-flex justify-content-center mb-4">
      <b-col cols="12" md="12">
        <!-- Users Section -->
        <h4 class="mb-3" v-show="all || users">Users</h4>
        <div class="mb-5 text-center" v-show="all || users">
          <template v-if="highlightedUsers.length && !highlightedUsers[0].msg">
            <b-list-group>
              <userStructure
                v-for="(user, index) in highlightedUsers"
                :key="index"
                :name="user.name"
                :avatar="$store.getters.asset(user.avatar)"
                obj="suggestions"
                list="users"
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
              :PIDP="post.PID"
              :new-post-data="{ content: post.content }"
              obj="suggestions"
              list="posts"
              :key="index"
            />
          </template>
          <small v-else v-html="highlightedPosts[0].msg"></small>
        </div>

        <!-- Reels Section -->
        <h4 class="mb-3" v-show="all || reels">Reels</h4>
        <div class="text-center" v-show="all || reels">
          <template v-if="highlightedReels.length && !highlightedReels[0].msg">
            <div class="d-flex justify-content-between reels-container">
              <div
                v-for="(reel, index) in highlightedReels"
                :key="index"
                class="reel-container"
              >
                <reelStructure
                  :RID="reel.RID"
                  :newReelData="{ disc: reel.disc }"
                  :discCollapse="`collapse-${index}`"
                  obj="suggestions"
                  list="reels"
                />
              </div>
            </div>
          </template>
          <small v-else v-html="highlightedReels[0].msg"></small>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import postStructure from "@/components/structures/post-structure.vue";
import reelStructure from "@/components/structures/reel-structure.vue";
import userStructure from "@/components/structures/user-structure.vue";

export default {
  name: "SearchView",
  data() {
    return {
      suggestions: this.$store.state.suggestions,
      searchQuery: "",
      all: true,
      users: false,
      posts: false,
      reels: false,
    };
  },
  components: {
    postStructure,
    userStructure,
    reelStructure,
  },
  computed: {
    searchValue() {
      return this.searchQuery;
    },
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
        : [
            {
              msg: `No matching users for "${this.searchValue}" to display!`,
            },
          ];
    },
    filteredPosts() {
      const query = this.searchValue.trim().toLowerCase();
      if (!query) return this.suggestions.posts;
      return this.suggestions.posts.filter((post) =>
        post.content.trim().toLowerCase().includes(query)
      );
    },
    highlightedPosts() {
      if (!this.searchValue.trim()) return this.filteredPosts;
      const matchedPosts = this.filteredPosts.map((post) => {
        const regex = new RegExp(`(${this.searchValue})`, "gim");
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
      const query = this.searchValue.trim().toLowerCase();
      if (!query) return this.suggestions.reels;
      return this.suggestions.reels.filter((reel) =>
        reel.disc.toLowerCase().trim().includes(query)
      );
    },
    highlightedReels() {
      console.log(this.searchValue);
      if (this.searchValue === "") return this.filteredReels;
      const matchedReels = this.filteredReels.map((reel) => {
        console.log(reel);
        console.log(this.filteredReels);
        const regex = new RegExp(`(${this.searchValue})`, "gi");
        return {
          ...reel,
          disc: reel.disc.replace(
            regex,
            `<span style="background:green;color:#fff;">$1</span>`
          ),
        };
      });
      return matchedReels.length
        ? matchedReels
        : [{ msg: `No matching reels for "${this.searchValue}" to display!` }];
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
.reels-container {
  overflow-x: scroll;
  .reel-container {
    min-width: 350px;
    margin: 10px;
  }
}
</style>
