
<template>
    <div class="discount-carousel">
      <swiper :options="swiperOption">
        <swiper-slide v-for="product in discountedProducts" :key="product.id">
          <div class="product-card" @click="goToProduct(product.id)">
            <img :src="product.image" :alt="product.title">
            <h3>{{ product.title }}</h3>
            <p class="discount">{{ product.discountPercentage }}% OFF</p>
            <p class="price">
              <span class="discounted">${{ product.discountedPrice.toFixed(2) }}</span>
              <span class="original">${{ product.originalPrice.toFixed(2) }}</span>
            </p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  
  export default {
    components: { Swiper, SwiperSlide },
    computed: {
      ...mapState('products', ['discountedProducts']),
      swiperOption() {
        return {
          slidesPerView: 3,
          spaceBetween: 30,
          // Add more Swiper options as needed
        };
      }
    },
    methods: {
      goToProduct(productId) {
        this.$router.push(`/product/${productId}`);
      }
    }
  };
  </script>
  
  <style scoped>

  .original {
    text-decoration: line-through;
    color: #999;
  }
  </style>