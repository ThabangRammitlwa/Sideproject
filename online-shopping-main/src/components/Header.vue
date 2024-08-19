
<template>
    <header class="header">
      <div class="container flex flex-center">
        <h1 class="logo">1.Stop-Store</h1>
        <nav>
          <ul class="nav-list flex">
            <input v-model="searchQuery" @keyup.enter="searchProducts" placeholder="Search..." />
            <button @click="searchProducts">Search</button>
            <router-link to="/" title="Home">
              <i class="fas fa-home"></i>
            </router-link>
            <router-link to="/products" title="Shop">
              <i class="fas fa-store"></i>
            </router-link>
            <router-link to="/wishlist" title="Wishlist">
            <i class="fas fa-heart"></i>
          </router-link>
            <router-link to="/cart" class="Cart-icon">
              <i class="fas fa-shopping-cart"></i>
              ({{ cartItemCount }})
            </router-link>
            <router-link to="/comparison" title="Comparison">
            <i class="fas fa-exchange-alt"></i>
          </router-link>
            <li v-if="isAuthenticated">
              <a href="#" @click.prevent="logout">Logout</a>
            </li>
            <li v-else>
              <a href="#" @click.prevent="showLoginModal">Login</a>
            </li>
          </ul>
        </nav>
      </div>
      <LoginModal v-if="showLogin" @close="showLogin = false" />
    </header>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import LoginModal from '../components/LoginModal.vue'
  
  export default {
    name: 'Header',
    components: {
      LoginModal,
    },
    data() {
      return {
        searchQuery: '',
        showLogin: false,
      };
    },
    computed: {
        ...mapGetters('auth', ['isAuthenticated']),  ...mapActions('auth', ['logout']), 
      ...mapGetters('cart', ['cartItemCount']),
        ...mapGetters('wishlist',['wishlistItemCount']),
    },
    methods: {
      ...mapActions('auth', ['logout']), 
      searchProducts() {
        if (this.searchQuery.trim()) {
          this.$router.push({ name: 'Products', query: { search: this.searchQuery } });
        }
      },
      showLoginModal() {
        this.showLogin = true;
      },
      logout() { 
        this.$store.dispatch('logout'); 
        this.$router.push('/login'); 
      },
    },
  };
  </script>
  
  <style scoped>
  .header {
    width: 100%;
    background-color: #333;
    color: #fff;
    box-sizing: border-box;
   /* position: fixed;*/
    top: 0;
    left: 0;
    z-index:1000;
    height: 70px;
  }
  .container {
  width: 100%; 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 0 20px; 
  box-sizing: border-box; 
}
  
  .nav-list {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .nav-list a {
    color: #fff;
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .nav-list a:hover {
    background-color: #555;
  }
  
  .Cart-icon {
    display: flex;
    align-items: center;
  }
  
  input[type="text"] {
    padding: 5px;
    margin-right: 10px;
  }
  
  button {
    padding: 5px 10px;
    cursor: pointer;
  }
  
  body {
  margin: 0; 
  padding: 0;
  box-sizing: border-box; 
  }
  main {
  padding-top: 80px; 
}
  </style>
  