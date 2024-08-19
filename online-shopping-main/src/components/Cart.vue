<template>
  <div class="cart">
    <h1>Shopping Cart</h1>
    <div v-if="cartItems && cartItems.length === 0">Your cart is empty</div>
    <div v-else-if="cartItems">
      <div v-for="item in cartItems" :key="item.productId" class="cart-item">
        <img v-if="item.image" :src="item.image" :alt="item.title" />
        <div class="details">
          <h2>{{ item.title || 'Unknown Product' }}</h2>
          <p v-if="item.price">Price: ${{ item.price }}</p>
          <input v-if="item.quantity" type="number" v-model.number="item.quantity" @change="updateItemQuantity(item)" min="1" />
          <button @click="removeItem(item.productId)">Remove</button>
        </div>
      </div>
      <div class="cart-summary">
        <p>Total: ${{ cartTotal || 0 }}</p>
        <button @click="clearCart">Clear Cart</button>
      </div>
    </div>
  </div>
</template>

  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters('cart', ['cartItems', 'cartTotal']),
      /*cartItems() {
        return this.$store.getters['cart/cartItems']
      },
      cartTotal() {
        return this.$store.getters['cart/cartTotal']
      },*/
    },
    methods: {
      ...mapActions('cart', ['removeFromCart', 'updateQuantity', 'clearCart']),
      updateItemQuantity(item) {
        this.updateQuantity({ productId: item.productId, quantity: item.quantity });
      },
      removeItem(productId) {
        this.removeFromCart(productId);
      }
    }
  };
  </script>
  
  <style scoped>
  .cart-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .details {
    flex: 1;
    padding-left: 20px;
  }
  
  .cart-summary {
    margin-top: 20px;
  }
  </style>
  