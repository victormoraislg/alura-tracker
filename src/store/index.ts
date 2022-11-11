import IProject from "@/interfaces/IProject";
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from "vue";
import { ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT, NOTIFY } from '@/store/mutations';
import { INotification } from "@/interfaces/INotification";

interface State {
  projects: IProject[],
  notifications: INotification[]
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
    notifications: []
  },
  mutations: {
    [ADD_PROJECT](state, projectName: string) {
      const project = {
        name: projectName,
        id: new Date().toISOString(),
      } as IProject;
      state.projects.push(project);
    },
    [EDIT_PROJECT](state, project: IProject) {
      const index = state.projects.findIndex(p => p.id == project.id);
      state.projects[index] = project;
    },
    [DELETE_PROJECT](state, id: string) {
      state.projects = state.projects.filter(p => p.id != id);
    },
    [NOTIFY](state, newNotification: INotification) {
      
      newNotification.id = new Date().getTime();
      state.notifications.push(newNotification);

      setTimeout(() => {
        state.notifications = state.notifications.filter(n => n.id != newNotification.id);
      }, 3000);
    }
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}