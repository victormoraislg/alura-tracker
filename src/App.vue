<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkModeActivated }">
    <div class="column is-2">
      <SideBar @onChangeThemeColor="changeThemeColor"/>
    </div>
    <div class="column is-10 content">
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
  },
  data() {
    return {
      darkModeActivated: false,
    };
  },
  methods: {
    changeThemeColor(darkModeActivated: boolean) {
      this.darkModeActivated = darkModeActivated;
    }
  }
});
</script>

<style>
.list {
  padding: 1.25rem;
}

main {
  --primary-bg: #fff;
  --primary-text: #000;
}

main.dark-mode {
  --primary-bg: #2b2d42;
  --primary-text: #ddd;
}

.content {
  background-color: var(--primary-bg);
}
</style>
