
import { getRandomFutureDate } from '../utils/dateHelpers';

export default {
  actions: {
    selectDiscountedProducts({ state, commit }) {
      const allProducts = [...state.products];
      const discountedProducts = [];
      
      for (let i = 0; i < 5 && allProducts.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * allProducts.length);
        const product = allProducts.splice(randomIndex, 1)[0];
        
        const discountPercentage = Math.floor(Math.random() * 50) + 10; // 10% to 60% discount
        const discountedPrice = product.price * (1 - discountPercentage / 100);
        const saleEndDate = getRandomFutureDate(); // Implement this utility function
        
        discountedProducts.push({
          ...product,
          discountPercentage,
          discountedPrice,
          saleEndDate,
          originalPrice: product.price
        });
      }
      
      commit('SET_DISCOUNTED_PRODUCTS', discountedProducts);
    }
  },
  mutations: {
    SET_DISCOUNTED_PRODUCTS(state, products) {
      state.discountedProducts = products;
    }
  }
};