export default {
    namespaced: true,
    state: {
        cart: JSON.parse(localStorage.getItem('cart')) || [],
        wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
    },
    getters: {
        isInCart: state => productId => !!state.cart.find(p => p.id === productId),
        isInWishlist: state => productId => !!state.wishlist.find(p => p.id === productId),

      cartItems: state => state.cart,
        
      cartTotal: state => {
        return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      cartItemCount: state => {
        return state.cart.reduce((total, item) => total + item.quantity, 0);
      },
      
    },
    mutations: {
      ADD_TO_CART(state, { product, quantity, userId }) {
        if (!userId) {
          console.error('User ID not found. Please log in.');
          return;
        }
        const item = state.cart.find(p => p.productId === product.id && p.userId === userId);
        if (item) {
          item.quantity += quantity;
        } else {
          state.cart.push({ ...product, quantity, userId });
        }
        localStorage.setItem('cart', JSON.stringify(state.cart));
      },
      REMOVE_FROM_CART(state, productId) {
        state.cart = state.cart.filter(p => p.productId !== productId);
        localStorage.setItem('cart', JSON.stringify(state.cart));
      },
      CLEAR_CART(state) {
        state.cart = [];
        localStorage.removeItem('cart');
        },
      
        ADD_TO_WISHLIST(state, product) {
            const item = state.wishlist.find(p => p.productId === product.id);
            if (!item) {
                state.wishlist.push({ ...product });
            }
            localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
            },
    },
    actions: {
      addToCart({ commit, rootGetters }, { product, quantity }) {
        const userId = rootGetters['auth/userId'];
        if (userId) {
          commit('ADD_TO_CART', { product, quantity, userId });
        } else {
          console.error('User ID not found. Please log in.');
        }
      },
      removeFromCart({ commit }, productId) {
        commit('REMOVE_FROM_CART', productId);
      },
      clearCart({ commit }) {
        commit('CLEAR_CART');
        },
      
        addToWishlist({ commit }, product) {
            commit('ADD_TO_WISHLIST', product);
          },
    },
  };
  
