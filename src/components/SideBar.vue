<template>
  <header>
    <h1>
      <img src="../assets/logo.png">
    </h1>
    <button class="button" @click="changeThemeColor">
      {{ buttonText }}
    </button>
    <nav class="panel mt-5">
      <ul>
        <li>
          <RouterLink to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tasks
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/projects" class="link">
            <i class="fas fa-project-diagram"></i>
            Projects
          </RouterLink>
        </li>
      </ul>
    </nav>
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
        return 'Disable dark mode';
      }

      return 'Enable dark mode';
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

.panel li {
  margin: 8px 0;
  text-align: left;
}

.link {
  color: #fff;
}

.link:hover {
  color: #FAF0CA;
}

.link.router-link-active {
  color: #FAF0CA;
}
</style>