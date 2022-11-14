import IProject from "@/interfaces/IProject";
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from "vue";
import { ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT, NOTIFY, DEFINE_PROJECTS } from '@/store/mutations';
import { INotification } from "@/interfaces/INotification";
import { REMOVE_PROJECT, ALTER_PROJECT, CREATE_PROJECT, GET_PROJECTS } from "./actions";
import clientHttp from "@/http";

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
    [DEFINE_PROJECTS](state, projects: IProject[]) {
      state.projects = projects;
    },
    [NOTIFY](state, newNotification: INotification) {
      
      newNotification.id = new Date().getTime();
      state.notifications.push(newNotification);

      setTimeout(() => {
        state.notifications = state.notifications.filter(n => n.id != newNotification.id);
      }, 3000);
    }
  },
  actions: {
    [GET_PROJECTS]({ commit }) {
      clientHttp.get('projects')
        .then((response) => commit(DEFINE_PROJECTS, response.data));
    },
    [CREATE_PROJECT](context, projectName: string) {
      return clientHttp.post('projects',{
        name: projectName
      });
    },
    [ALTER_PROJECT](context, project: IProject) {
      return clientHttp.put(`projects/${project.id}`, project);
    },
    [REMOVE_PROJECT]({ commit }, id: string) {
      return clientHttp.delete(`projects/${id}`)
        .then(() => commit(DELETE_PROJECT, id));
    }
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}