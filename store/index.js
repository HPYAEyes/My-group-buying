import Vue from 'vue';
import Vuex from 'vuex';
import geo from './modules/geo';
import user from './modules/user';
import product from './modules/product';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    geo,
    product,
    user
  },
  actions: {
    async nuxtServerInit({ commit }, { req, app }) {
      const { data } = await app.$axios.get('/users/getUser');
      if (data.code === 'SUC') {
        commit('user/setUserInfo', { username: data.username, _id: data._id, email: data.email, avatar: data.avatar });
      } else {
        commit('user/setUserInfo', {});
      }
      const { status: geoStatus, data: { data: { province, city, adcode } } } = await app.$axios.get('/geo/getPosition');
      commit('geo/setPosition', geoStatus === 200 ? { province, city, adcode } : { province: '', city: '', adcode: '' });
      const { status: cityStatus, data: { data: { provinceList } } } = await app.$axios.get('/geo/getAllCity');
      commit('geo/setCityList', cityStatus === 200 ? provinceList : []);
      const { status: hotStatus, data: { data: { districts } } } = await app.$axios.get('/geo/getHotCity');
      commit('geo/setHotCity', hotStatus === 200 ? districts : []);
    }
  }
});

export default store;