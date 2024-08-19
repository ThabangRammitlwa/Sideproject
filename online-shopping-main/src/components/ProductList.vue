<template>
  <div class="container">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div>
      <FilterSort :categories="categories" @filterSort="applyFilterSort"/>
    </div>
    <div class="product-grid">
      <ProductCard v-for="product in filteredAndSortedProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import ProductCard from '../components/ProductCard.vue';
import FilterSort from '../components/FilterSort.vue';

export default {
  name: 'ProductList',
  components: {
    ProductCard,
    FilterSort
  },
  computed: {
    ...mapState(['loading', 'error', 'categories']),
    ...mapGetters(['filteredAndSortedProducts']),
  },
  methods: {
    ...mapActions(['fetchProducts', 'fetchCategories']),
    
    /**
     * Applies the filter and sort options to the product list.
     * @param {Object} filterSortOptions - The filter and sort options.
     * @param {string} filterSortOptions.category - The selected category to filter by.
     * @param {string} filterSortOptions.sort - The selected sort option.
     */
    applyFilterSort({ category, sort }) {
      this.$store.commit('setActiveCategory', category);
      this.$store.commit('setActiveSort', sort);
    }
  },
  mounted() {
    this.fetchProducts();
    this.fetchCategories();
  }
};
</script>


<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  padding: 20px;
  background-color: var(--grid-background); 
  color: var(--text-color); 
}

select {
  margin: 10px;
  background-color: var(--select-background); 
  color: var(--text-color); 
  border: 1px solid var(--border-color); 
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}


:root {
  --grid-background: #fff;
  --text-color: #000;
  --select-background: #f0f0f0;
  --border-color: #ccc;
}

body.dark-mode :root {
  --grid-background: #1e1e1e;
  --text-color: #fff;
  --select-background: #333;
  --border-color: #444;
}
</style>

