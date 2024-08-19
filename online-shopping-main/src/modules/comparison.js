
export default {
  namespaced: true,
  state: {
    comparisonList: JSON.parse(localStorage.getItem('comparisonList')) || [],
  },
  getters: {
    isInComparison: (state) => (productId) => {
        return state.items.some(item => item.id === productId);
      }
  },
  mutations: {
    ADD_TO_COMPARISON(state, { product, userId }) {
      if (!userId) {
        console.error('User ID not found. Please log in.');
        return;
      }
      const item = state.comparisonList.find(p => p.productId === product.id && p.userId === userId);
      if (!item) {
        state.comparisonList.push({ ...product, userId });
      }
      localStorage.setItem('comparisonList', JSON.stringify(state.comparisonList));
    },
  
    REMOVE_FROM_COMPARISON(state, productId) {
      state.items = state.items.filter(item => item.id !== productId);
    },
    CLEAR_COMPARISON(state) {
      state.items = [];
    }
  },
  actions: {
    addToComparison({ commit, rootGetters }, product) {
      const userId = rootGetters['auth/userId'];
      if (userId) {
        commit('ADD_TO_COMPARISON', { product, userId });
      } else {
        console.error('User ID not found. Please log in.');
      }
    },
    removeFromComparison({ commit }, productId) {
      commit('REMOVE_FROM_COMPARISON', productId);
    },
    clearComparison({ commit }) {
      commit('CLEAR_COMPARISON');
    }
  }
};
  