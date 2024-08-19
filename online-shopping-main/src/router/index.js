import { createRouter, createWebHistory } from 'vue-router'; 
import Welcome from '../components/Welcome.vue';
import ProductList from '../components/ProductList.vue';
import ProductDetails from '../components/ProductDetail.vue';
import Login from '../components/Login.vue';
import Cart from '../components/Cart.vue'; 
import Comparison from '../components/Comparison.vue';
import DiscountCarousel from '../components/DiscountCarousel.vue';
import Wishlist from '../components/Wishlist.vue';
import store from '../store';  

const routes = [
    { path: '/', name: 'Welcome', component: Welcome },
    { path: '/discount', name: 'DiscountCarousel', component: DiscountCarousel },
    { path: '/products', name: 'ProductList', component: ProductList },
    { path: '/product/:id', name: 'ProductDetails', component: ProductDetails, props: true },
    { path: '/login', name: 'Login', component: Login },
    { 
      path: '/cart', name: 'Cart', component: Cart,
      beforeEnter: (to, from, next) => {
        if (store.getters['auth/isAuthenticated']) {  
          next();
        } else {
          next('/login');  
        }
      },
    },
    { 
      path: '/comparison', name: 'Comparison', component: Comparison,
      beforeEnter: (to, from, next) => {
        if (store.getters['auth/isAuthenticated']) { 
          next();
        } else {
          next('/login');  
        }
      },
    },
   {
     path: '/wishlist', name: 'Wishlist', component: Wishlist,
      beforeEnter: (to, from, next) => {
        if (store.getters['auth/isAuthenticated']) {  
          next();
        } else {
          next('/login');  
        }
      },
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

