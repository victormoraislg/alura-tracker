<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkModeActivated }">
    <div class="column is-2">
      <SideBar @onChangeThemeColor="changeThemeColor"/>
    </div>
    <div class="column is-10 content">
      <TaskForm @onSaveTask="saveTask"/>
      <div class="list">
        <TaskItem v-for="(task, index) in tasks" :key="index" :task="task"/>
        <BoxItem v-if="taskListIsEmpty">
            Apparently you haven't started any task yet.
        </BoxItem>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue';
import TaskForm from './components/Task/Form.vue';
import TaskItem from './components/Task/Task.vue';
import ITask from './interfaces/ITask';
import BoxItem from './components/Box.vue';

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    TaskForm,
    TaskItem,
    BoxItem
  },
  data() {
    return {
      tasks: [] as ITask[],
      darkModeActivated: false,
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
    },
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
