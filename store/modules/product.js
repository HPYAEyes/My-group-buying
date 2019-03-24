const state = () => ({
  hotProduct: []
});

const mutations = {
  setHotProduct(state, val) {
    state.hotProduct = val;
  },
};

const actions = {
  setTypeList({ commit }, hotProduct) {
    commit('setHotProduct', typehotProductList);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}