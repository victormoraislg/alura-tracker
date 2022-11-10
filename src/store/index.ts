import IProject from "@/interfaces/IProject";
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from "vue";
import { ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT } from '@/store/mutations';

interface State {
  projects: IProject[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: []
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
    }
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}