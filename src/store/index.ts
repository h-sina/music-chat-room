import { createStore } from 'vuex';

export const store = createStore({
  state: {
    userInfo: null,
  },
  mutations: {
    setUserInfo(state, info) {
      state.userInfo = info;
    },
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
  },
  // actions: {
  //   setUserInfo(state, info) {
  //     state.userInfo = info;
  //     console.log(info);
  //   },
  // },
  // modules: {
  //   user,
  // },
});

// export default store;
