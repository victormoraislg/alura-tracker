<template>
  <TaskForm @onSaveTask="saveTask"/>
  <div class="list">
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="Search" v-model="search_term">
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <BoxItem v-if="taskListIsEmpty">
      Apparently you haven't started any task yet.
    </BoxItem>
    <TaskItem v-for="(task, index) in tasks" :key="index" :task="task" @onTaskSelected="selectTask"/>
    <TaskModal :show="selectedTask != null">
      <template v-slot:header>
        <p class="modal-card-title">Edit task</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </template>
      <template v-slot:body>
        <div class="field">
          <label for="description" class="label">Description</label>
          <input type="text" id="description" class="input" v-model="selectedTask.description">
        </div>
      </template>
      <template v-slot:footer>
        <button class="button is-success" @click="editTask">Save</button>
        <button class="button" @click="closeModal">Cancel</button>
      </template>
    </TaskModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import TaskForm from '../components/Task/Form.vue';
import TaskItem from '../components/Task/Task.vue';
import ITask from '../interfaces/ITask';
import BoxItem from '../components/Box.vue';
import { useStore } from '@/store';
import { CREATE_TASK, EDIT_TASK, REQUEST_PROJECTS, REQUEST_TASKS } from '@/store/actions';
import { computed } from '@vue/reactivity';
import TaskModal from '@/components/Modal.vue';

export default defineComponent({
  name: 'TasksView',
  components: {
    TaskForm,
    TaskItem,
    BoxItem,
    TaskModal
  },
  data() {
    return {
      selectedTask: null as ITask | null
    }
  },
  computed: {
    taskListIsEmpty() {
      return false;
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

    const search_term = ref('');

    watchEffect(() => {
      store.dispatch(REQUEST_TASKS, search_term.value)
    });

    return {
      tasks: computed(() => store.state.tasks.data),
      store,
      search_term
    }
  }
});
</script>