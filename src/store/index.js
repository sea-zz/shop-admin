import { createStore } from 'vuex'
import { getUserInfo } from '../api/manager';

const store = createStore({
  state() {
    return {
      user: null,
      isCollapse: false
    }
  },
  mutations: {
    setUserInfo(state, user) {
      state.user = user;
    },
    setCollapse(state, collapse) {
      state.isCollapse = collapse;
    }
  },
  /**
   * Action 类似于 mutation，不同在于：
    Action 提交的是 mutation，而不是直接变更状态。
    Action 可以包含任意异步操作。
   */
  actions: {
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          commit('setUserInfo', res);
          resolve(res);
        }, err => {
          reject(err);
        })
      })
    }
  }
})

export default store;
