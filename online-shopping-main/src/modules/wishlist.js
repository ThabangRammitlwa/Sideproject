export default {
  namespaced: true,
  state: {
    wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
  },
  getters: {
    wishlistItems: state => state.wishlist || [],
    wishlistItemCount: state => state.wishlist.length,
  },
  mutations: {
    ADD_TO_WISHLIST(state, product) {
      const item = state.wishlist.find(p => p.productId === product.id);
      if (!item) {
        state.wishlist.push({ ...product });
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
      }
    },

   
    REMOVE_FROM_WISHLIST(state, productId) {
      state.wishlist = state.wishlist.filter(p => p.productId !== productId);
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },

    
    CLEAR_WISHLIST(state) {
      state.wishlist = [];
      localStorage.removeItem('wishlist');
    },
  },
  actions: {
  
    addToWishlist({ commit, rootGetters }, product) {
      const userId = rootGetters['auth/userId'];
      if (userId) {
        commit('ADD_TO_WISHLIST', { product, userId });
      } else {
        console.error('User ID not found. Please log in.');
      }
    },

    addToWishlist({ commit }, product) {
      commit('ADD_TO_WISHLIST', product);
    },

  
    removeFromWishlist({ commit }, productId) {
      commit('REMOVE_FROM_WISHLIST', productId);
    },

    clearWishlist({ commit }) {
      commit('CLEAR_WISHLIST');
    },
  },
};
