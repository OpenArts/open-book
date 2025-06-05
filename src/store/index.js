import Vue from "vue";
import Vuex from "vuex";
import jprofile from "@/json/profile.json";
import suggestions from "@/json/suggestions.json";
import { findPost, findReel } from "@/utils/helpers.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: jprofile,
    suggestions: suggestions,
  },
  getters: {
    asset: () => (path) => {
      try {
        return require(`@/${path}`);
      } catch (error) {
        console.error(`Image not found: ${path}`);
        return null;
      }
    },
    getPostPropByPID: (state) => (PID, obj, list, prop) => {
      let post = findPost(state, PID, obj, list);

      return post[prop];
    },
    getReelPropByRID: (state) => (RID, obj, list, prop) => {
      let reel = findReel(state, RID, obj, list);
      if (reel) return reel[prop];
    },
  },
  mutations: {
    updateProp(state, { searchingFor, ID, property, value }) {
      // Update saved element
      const saved = () => {
        if (searchingFor === "post") {
          return state.profile.saved.posts.find((post) => post.PID === ID);
        }
        return state.profile.saved.reels.find((reel) => reel.RID === ID);
      };
      if (saved()) {
        Vue.set(saved(), property, value);
      }
      // Update shared element
      const shared = () => {
        if (searchingFor === "post") {
          return state.profile.posts.find((post) => post.PID === ID);
        }
        return state.profile.reels.find((reel) => reel.RID === ID);
      };

      if (shared()) {
        Vue.set(shared(), property, value);
      }
      // Update suggested element
      const suggested = () => {
        if (searchingFor === "post") {
          return state.suggestions.posts.find((post) => post.PID === ID);
        }
        return state.suggestions.reels.find((reel) => reel.RID === ID);
      };
      if (suggested()) {
        Vue.set(suggested(), property, value);
      }
    },
    savePost(state, { post }) {
      state.profile.saved.posts = [...state.profile.saved.posts, post];
      alert("post saved");
    },
    deletePost(state, { PID }) {
      state.profile.saved.posts = state.profile.saved.posts.filter(
        (post) => post.PID !== PID
      );

      state.profile.posts = state.profile.posts.filter(
        (post) => post.PID !== PID
      );
      state.suggestions.posts = state.suggestions.posts.filter(
        (post) => post.PID !== PID
      );
    },
    saveReel(state, { reel }) {
      Vue.set(
        state.profile.saved.reels,
        state.profile.saved.reels.length,
        reel
      );
      alert("reel saved");
    },
    deleteReel(state, { RID }) {
      state.profile.saved.reels = state.profile.saved.reels.filter(
        (reel) => reel.RID !== RID
      );
      state.profile.reels = state.profile.reels.filter(
        (reel) => reel.RID !== RID
      );
      state.suggestions.reels = state.suggestions.reels.filter(
        (reel) => reel.RID !== RID
      );
    },
    upload(state, { data, type }) {
      if (type === "post") {
        Vue.set(state.profile.posts, state.profile.posts.length, data);
        Vue.set(state.suggestions.posts, state.suggestions.posts.length, data);
        return;
      }
      Vue.set(state.profile.reels, state.profile.reels.length, data);
      Vue.set(state.suggestions.reels, state.suggestions.reels.length, data);
    },
  },
  actions: {},
  modules: {},
});
