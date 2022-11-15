<template>
  <TaskForm @onSaveTask="saveTask"/>
  <div class="list">
    <BoxItem v-if="taskListIsEmpty">
      Apparently you haven't started any task yet.
    </BoxItem>
    <TaskItem v-for="(task, index) in tasks" :key="index" :task="task" @onTaskSelected="selectTask"/>
    <div class="modal" :class="{'is-active': selectedTask}" v-if="selectedTask">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit task</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
        <label for="description" class="label">Description</label>
        <input type="text" id="description" class="input" v-model="selectedTask.description">
      </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="editTask">Save</button>
          <button class="button" @click="closeModal">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskForm from '../components/Task/Form.vue';
import TaskItem from '../components/Task/Task.vue';
import ITask from '../interfaces/ITask';
import BoxItem from '../components/Box.vue';
import { useStore } from '@/store';
import { CREATE_TASK, EDIT_TASK, REQUEST_PROJECTS, REQUEST_TASKS } from '@/store/actions';
import { computed } from '@vue/reactivity';

export default defineComponent({
  name: 'TasksView',
  components: {
    TaskForm,
    TaskItem,
    BoxItem
  },
  data() {
    return {
      selectedTask: null as ITask | null
    }
  },
  computed: {
    taskListIsEmpty() : boolean {
      return this.tasks.length === 0;
    },
  },
  methods: {
    saveTask (task: ITask) {
      this.store.dispatch(CREATE_TASK, task);
    },
    selectTask(task: ITask) {
      this.selectedTask = task;
    },
    closeModal() {
      this.selectedTask = null;
    },
    editTask() {
      this.store.dispatch(EDIT_TASK, this.selectedTask)
        .then(() => this.closeModal());
    }
  },
  setup() {
    const store = useStore();
    store.dispatch(REQUEST_TASKS);
    store.dispatch(REQUEST_PROJECTS);

    return {
      tasks: computed(() => store.state.tasks.data),
      store
    }
  }
});
</script>