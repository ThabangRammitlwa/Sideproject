<template>
    <div class="theme-toggle">
      <label class="switch">
        <input type="checkbox" @change="toggleTheme" :checked="isDarkMode">
        <span class="slider"></span>
      </label>
      <span>{{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}</span>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        isDarkMode: false
      };
    },
    created() {
      const savedTheme = localStorage.getItem('theme');
      this.isDarkMode = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      this.applyTheme();
    },
    methods: {
      toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
      },
      applyTheme() {
        document.body.classList.toggle('dark-mode', this.isDarkMode);
        document.body.classList.toggle('light-mode', !this.isDarkMode);
      }
    }
  };
  </script>
  
  <style scoped>
  .theme-toggle {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}
  
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}
  </style>
  