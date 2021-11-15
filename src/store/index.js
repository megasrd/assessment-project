import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    canary_data: []
  },
  mutations: {
    SET_CANARY_DATA(state, data) {
      state.canary_data = data;
    }
  },
  actions: {
    async getData({ commit }) { 
      await axios.get('https://thinkst-frontend-resources.s3-eu-west-1.amazonaws.com/incidents/data.json')
           .then(response => {
             commit('SET_CANARY_DATA', response.data)
           })
    }
  },
  modules: {  
  }
})
