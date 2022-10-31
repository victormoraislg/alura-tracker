<template>
  <div class="box">
    <div class="columns">
      <div class="column is-8" role="Form" aria-label="Form to create new task">
        <input type="text" class="input" placeholder="Wich task do you want to start?" v-model="taskDescription">
      </div>
      <div class="column">
        <TaskTimer @onStop="archiveTask"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import TaskTimer from './Timer.vue';

export default defineComponent({
  name: 'TaskForm',
  emits: [
    'onSaveTask'
  ],
  components: {
    TaskTimer
  },
  data() {
    return {
      taskDescription: '',
    };
  },
  methods: {
    archiveTask(timeInSeconds: number) : void {
      this.$emit('onSaveTask', {
        durationInSeconds: timeInSeconds,
        description: this.taskDescription
      });
      this.taskDescription = '';
    },
  }
});

</script>