<template>
  <div class="box taskForm">
    <div class="columns">
      <div class="column is-6" role="Form" aria-label="Form to create new task">
        <input type="text" class="input" placeholder="Wich task do you want to start?" v-model="taskDescription">
      </div>
      <div class="column is-2">
        <div class="select">
          <select v-model="projectId">
            <option value="">Select the project</option>
            <option :value="project.id" v-for="project in projects" :key="project.id"> {{ project.name }} </option>
          </select>
        </div>
      </div>
      <div class="column is-4">
        <TaskTimer @onStop="archiveTask"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { key } from '@/store';
import { computed } from '@vue/reactivity';
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import TaskTimer from './Timer.vue';

export default defineComponent({
  name: 'TaskForm',
  emits: ['onSaveTask'],
  components: {
    TaskTimer
  },
  setup(props, { emit }) {
    const store = useStore(key);

    const taskDescription = ref("");
    const projectId = ref("");
    
    const projects = computed(() => store.state.projects.data);

    const archiveTask = (timeInSeconds: number) : void => {
      emit('onSaveTask', {
        durationInSeconds: timeInSeconds,
        description: taskDescription.value,
        project: projects.value.find(proj => proj.id == projectId.value)
      });
      taskDescription.value = '';
    }

    return {
      taskDescription,
      projectId,
      projects,
      archiveTask
    }
  }
});

</script>

<style>

.taskForm {
  color: var(--primary-text);
  background-color: var(--primary-bg);
}

</style>