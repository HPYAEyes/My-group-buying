const state = () => ({
  typeList: []
});

const mutations = {
  setTypeList(state, val) {
    state.typeList = val;
  },
};

const actions = {
  setTypeList({ commit }, typeList) {
    commit('typeList', typeList);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}