<template>
    <div class="wishlist">
      <h1>Your Wishlist</h1>
      <div v-if="wishlistItems.length === 0">Your wishlist is empty</div>
      <div v-else>
        <div v-for="item in wishlistItems" :key="item.productId" class="wishlist-item">
          <img v-if="item.image" :src="item.image" :alt="item.title" />
          <div class="details">
            <h2>{{ item.title || 'Unknown Product' }}</h2>
            <p v-if="item.price">Price: ${{ item.price }}</p>
            <button @click="removeFromWishlist(item.productId)">Remove from Wishlist</button>
            <button @click="moveToCart(item)">Move to Cart</button>
          </div>
        </div>
        <div class="wishlist-summary">
          <p>Total Items: {{ wishlistItemCount }}</p>
          <button @click="clearWishlist">Clear Wishlist</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters('wishlist', ['wishlistItems', 'wishlistItemCount']),
    },
    methods: {
      ...mapActions('wishlist', ['removeFromWishlist', 'addToCart', 'clearWishlist']),
      removeFromWishlist(productId) {
        this.removeFromWishlist(productId);
      },
      moveToCart(item) {
        this.addToCart({ product: item, quantity: 1 });
        this.removeFromWishlist(item.productId);
      },
    },
  };
  </script>
  