<template>
  <header>
    <h1>
      <img src="../assets/logo.png">
    </h1>
    <button class="button" @click="changeThemeColor">
      {{ buttonText }}
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SideBar',
  emits: [
    'onChangeThemeColor'
  ],
  data() {
    return {
      darkModeActivated: false
    };
  },
  computed: {
    buttonText() {
      if (this.darkModeActivated) {
        return 'Turn off dark mode';
      }

      return 'Turn on dark mode';
    }
  },
  methods: {
    changeThemeColor() {
      this.darkModeActivated = !this.darkModeActivated;
      this.$emit('onChangeThemeColor', this.darkModeActivated);
    }
  }
});
</script>

<style scoped>
header {
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  padding: 1rem;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>