<template>
  <TaskForm @onSaveTask="saveTask"/>
  <div class="list">
    <TaskItem v-for="(task, index) in tasks" :key="index" :task="task"/>
    <BoxItem v-if="taskListIsEmpty">
        Apparently you haven't started any task yet.
    </BoxItem>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskForm from '../components/Task/Form.vue';
import TaskItem from '../components/Task/Task.vue';
import ITask from '../interfaces/ITask';
import BoxItem from '../components/Box.vue';

export default defineComponent({
  name: 'TasksView',
  components: {
    TaskForm,
    TaskItem,
    BoxItem
  },
  data() {
    return {
      tasks: [] as ITask[],
    };
  },
  computed: {
    taskListIsEmpty() : boolean {
      return this.tasks.length === 0;
    },
  },
  methods: {
    saveTask (task: ITask) {
      this.tasks.push(task);
    }
  }
});
</script>