import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import TasksView from '../views/Tasks.vue';
import ProjectsView from '../views/Projects.vue';
import ListView from '@/views/Projects/List.vue';
import FormView from '@/views/Projects/Form.vue';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tasks',
    component: TasksView
  },
  {
    path: '/projects',
    component: ProjectsView,
    children: [
      {
        path: '',
        name: 'Projects',
        component: ListView,
      },
      {
        path: 'create',
        name: 'Create project',
        component: FormView,
      },
      {
        path: ':id',
        name: 'Edit project',
        component: FormView,
        props: true,
      },
    ]
  },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
  });

export default router;