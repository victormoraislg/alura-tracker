<template>
  <section>
    <RouterLink to="/projects/create" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Create project</span>
    </RouterLink>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td> {{ project.id }} </td>
          <td> {{ project.name }} </td>
          <td>
            <RouterLink :to="`/projects/${project.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </RouterLink>
            <button class="button ml-2 is-danger" @click="deleteProject(project.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';
import { REQUEST_PROJECTS, DELETE_PROJECT } from '@/store/actions';

export default defineComponent({
  name: 'ListView',
  methods: {
    deleteProject(id: string) {
      this.store.dispatch(DELETE_PROJECT, id);
    }
  },
  setup() {
    const store = useStore();
    store.dispatch(REQUEST_PROJECTS);

    return {
      projects: computed(() => store.state.projects.data),
      store
    }
  }
});

</script>