import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from "vue";
import { NOTIFY } from '@/store/actions';
import { INotification } from "@/interfaces/INotification";
import { ProjectState, projects } from "./modules/projects";
import { TaskState, tasks } from './modules/tasks';

export interface State {
  tasks: TaskState,
  projects: ProjectState,
  notifications: INotification[]
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    tasks: {
      data: []
    },
    projects: {
      data: []
    },
    notifications: []
  },
  mutations: {
    [NOTIFY](state, newNotification: INotification) {
      
      newNotification.id = new Date().getTime();
      state.notifications.push(newNotification);

      setTimeout(() => {
        state.notifications = state.notifications.filter(n => n.id != newNotification.id);
      }, 3000);
    }
  },
  modules: { tasks, projects }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}