<template>
  <section class="projects">
    <h1 class="title">Projects list</h1>
    <form @submit.prevent="saveProject">
      <div class="field">
        <label for="projectName" class="label">Project name</label>
        <input type="text" id="projectName" class="input" v-model="projectName">
      </div>
      <div class="field">
        <button class="button" type="submit">Save</button>
      </div>
    </form>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td> {{ project.id }} </td>
          <td> {{ project.name }} </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'ProjectsView',
  data() {
    return {
      projectName: ''
    };
  },
  methods: {
    saveProject() {
      this.store.commit('ADD_PROJECT', this.projectName);
      this.projectName = '';
    }
  },
  setup() {
    const store = useStore();

    return {
      store,
      projects: computed(() => store.state.projects)
    }
  }
});

</script>

<style scoped>
.projects {
  padding: 1.5rem;
}
</style>