
<template>
    <div class="home">
      <h2>Discounted Products</h2>
      <DiscountCarousel />
      <!-- Rest of your homepage content -->
    </div>
  </template>
  
  <script>
  import DiscountCarousel from '@/components/DiscountCarousel.vue';
  import { mapActions } from 'vuex';
  
  export default {
    components: { DiscountCarousel },
    methods: {
      ...mapActions('products', ['selectDiscountedProducts'])
    },
    created() {
      this.selectDiscountedProducts();
    }
  };
  </script>