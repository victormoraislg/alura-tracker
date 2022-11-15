import IProject from "@/interfaces/IProject";
import { Module } from "vuex";
import { State } from '@/store';
import httpClient from "@/http";
import { REQUEST_PROJECTS, CREATE_PROJECT, EDIT_PROJECT, DELETE_PROJECT, SET_PROJECTS } from "@/store/actions";

export interface ProjectState {
  data: IProject[]
}

export const projects: Module<ProjectState, State> = {
  mutations: {
    [SET_PROJECTS](state, projects: IProject[]) {
      state.data = projects;
    },
    [CREATE_PROJECT](state, projectName: string) {
      const project = {
        name: projectName,
        id: new Date().toISOString(),
      } as IProject;
      state.data.push(project);
    },
    [EDIT_PROJECT](state, project: IProject) {
      const index = state.data.findIndex(p => p.id == project.id);
      state.data[index] = project;
    },
    [DELETE_PROJECT](state, id: string) {
      state.data = state.data.filter(p => p.id != id);
    }
  },
  actions: {
    [REQUEST_PROJECTS]({ commit }) {
      httpClient.get('projects')
        .then((response) => commit(SET_PROJECTS, response.data));
    },
    [CREATE_PROJECT](context, projectName: string) {
      return httpClient.post('projects',{
        name: projectName
      });
    },
    [EDIT_PROJECT](context, project: IProject) {
      return httpClient.put(`projects/${project.id}`, project);
    },
    [DELETE_PROJECT]({ commit }, id: string) {
      return httpClient.delete(`projects/${id}`)
        .then(() => commit(DELETE_PROJECT, id));
    }
  }
}