<template>
    <div class="welcome-page">
      <h1>Welcome to 1.Stop-Store</h1>
      <p>Your one-stop shop for all your needs.</p>
      <router-link to="/products" class="shop-now-button">Shop Now</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Welcome',
  };
  </script>
  
  <style scoped>
  .welcome-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    background-color: #f4f4f4;
  }
  
  h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.2em;
    margin-bottom: 30px;
  }
  
  .shop-now-button {
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .shop-now-button:hover {
    background-color: #555;
  }
  </style>
  