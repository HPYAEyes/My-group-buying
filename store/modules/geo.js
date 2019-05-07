const state = () => ({
  position: '',
  cityList: [],
  hotCity: [],
  choosedCity: {
    adcode: '330100',
    center: '120.153576,30.287459',
    citycode: '0571',
    name: '杭州市',
    province: '浙江省',
    city: '杭州市'
  },
  hotArea: []
});

const mutations = {
  setPosition(state, val) {
    state.position = val;
  },
  setCityList(state, val) {
    state.cityList = val;
  },
  setHotCity(state, val) {
    state.hotCity = val;
  },
  setChoosedCity(state, val) {
    state.choosedCity = val;
  },
  setHotArea(state, val) {
    state.hotArea = val;
  }
};

const actions = {
  setPosition({ commit }, position) {
    commit('setPosition', position);
  },
  setCityList({ commit }, cityList) {
    commit('setCityList', cityList);
  },
  setHotCity({ commit }, hotCity) {
    commit('setHotCity', hotCity);
  },
  setChoosedCity({ commit }, choosedCity) {
    commit('setChoosedCity', choosedCity);
  },
  setHotArea({ commit }, hotArea) {
    commit('setHotArea', hotArea);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}