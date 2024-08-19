<template>
    <div class="comparison-page">
      <h1>Product Comparison</h1>
  
      <div v-if="comparisonItems.length === 0">
        <p>No items in the comparison list.</p>
      </div>
      
      <div v-else>
        <div class="comparison-grid">
          <div v-for="product in comparisonItems" :key="product.id" class="comparison-item">
            <img :src="product.image" :alt="product.title" class="product-image"/>
            <h2>{{ product.title }}</h2>
            <p>{{ product.description }}</p>
            <p>Price: ${{ product.price }}</p>
            <p>Category: {{ product.category }}</p>
            <p>Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)</p>
            <button @click="removeFromComparison(product.id)" title="Remove from Comparison">
              <i class="fa fa-times"></i> Remove
            </button>
          </div>
        </div>
        <button @click="clearComparison" class="clear-button">Clear Comparison List</button>
      </div>
    </div>
  </template>
  
  <script>
  import {mapState, mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'Comparison',
    computed: {
        ...mapState('comparison', ['Items']),
      ...mapGetters('comparison', ['comparisonItems']),
    },
    methods: {
      ...mapActions('comparison', ['removeFromComparison', 'clearComparison']),
    },
  };
  </script>
  
  <style scoped>
.comparison-page {
  padding: 20px;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th,
.comparison-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.comparison-image {
  max-width: 100px;
  max-height: 100px;
}

.remove-button,
.clear-button {
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.clear-button {
  background-color: #555;
}
  </style>
  