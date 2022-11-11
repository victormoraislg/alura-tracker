<template>
  <BoxItem>
    <div class="columns">
      <div class="column is-4">
        {{ task.description || 'Task description' }}
      </div>
      <div class="column is-3">
        {{ task.project?.name || 'N/D' }}
      </div>
      <div class="column">
        <TaskTimerCounter :timeInSeconds="task.durationInSeconds"/>
      </div>
    </div>
  </BoxItem>
</template>

<script lang="ts">
import ITask from '@/interfaces/ITask';
import { defineComponent, PropType } from 'vue';
import TaskTimerCounter from './TimerCounter.vue';
import BoxItem from '@/components/Box.vue';

export default defineComponent({
  name: 'TaskItem',
  components: {
    TaskTimerCounter,
    BoxItem
  },
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true
    }
  }
});
</script>