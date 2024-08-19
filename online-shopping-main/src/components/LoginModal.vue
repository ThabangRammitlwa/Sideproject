<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              required
            />
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
        <button class="close-button" @click="closeModal">Close</button>
      </div>
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
            this.$emit('close');  // Close the modal after successful login
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
      closeModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    max-width: 80%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .password-container {
    display: flex;
    align-items: center;
  }
  
  button[type="button"] {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #ddd;
    border: none;
    cursor: pointer;
  }
  
  button[type="submit"] {
    width: 100%;
    padding: 10px;
    background-color: #0288d1;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 20px;
  }
  
  .close-button {
    margin-top: 20px;
    padding: 5px 10px;
    background-color: #f44336;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  