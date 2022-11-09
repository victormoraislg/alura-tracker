import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import TasksView from '../views/Tasks.vue';
import ProjectsView from '../views/Projects.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tasks',
    component: TasksView
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsView
  },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
  });

export default router;