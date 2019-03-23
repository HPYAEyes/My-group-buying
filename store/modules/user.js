const state = () => ({
  userInfo: {}
});

const mutations = {
  setUserInfo(state, val) {
    state.userInfo = val;
  },
};

const actions = {
  setUserInfo({ commit }, userInfo) {
    commit('setUserInfo', useruserInfoname);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}