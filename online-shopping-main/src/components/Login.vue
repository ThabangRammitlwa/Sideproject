<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-container">
            <input
              :type="passwordVisible ? 'text' : 'password'"
              id="password"
              v-model="password"
              required
            />
            <button type="button" @click="togglePasswordVisibility">
              {{ passwordVisible ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
  
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        passwordVisible: false,
        isLoading: false,
        errorMessage: null,
      };
    },
    methods: {
        logout() {
    localStorage.removeItem('token');
    this.$store.dispatch('clearCart');
    this.$router.push('/login');
  },

      togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
      },
      async login() {
        if (!this.username || !this.password) {
          this.errorMessage = "Username and password can't be empty";
          return;
        }
  
        this.isLoading = true;
        this.errorMessage = null;
  
        try {
          const response = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
            }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            localStorage.setItem('token', data.token);
            this.$router.push(this.$route.query.redirect || '/');
          } else {
            this.errorMessage = 'Login failed. Please check your username and password.';
          }
        } catch (error) {
          this.errorMessage = 'An error occurred. Please try again later.';
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles for the login page */
  </style>
  