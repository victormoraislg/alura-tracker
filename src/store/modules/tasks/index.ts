import ITask from "@/interfaces/ITask";
import { State } from "@/store";
import { REQUEST_TASKS, CREATE_TASK, EDIT_TASK, SET_TASKS } from "@/store/actions";
import { Module } from "vuex";
import httpClient from "@/http";

export interface TaskState {
  data: ITask[]
}

export const tasks: Module<TaskState, State> = {
  mutations: {
    [SET_TASKS] (state, tasks: ITask[]) {
      state.data = tasks;
    }, 
    [CREATE_TASK] (state, task: ITask) {
      state.data.push(task);
    },
    [EDIT_TASK] (state, task: ITask) {
      const index = state.data.findIndex(t => t.id == task.id);
      state.data[index] = task;
    }
  },
  actions: {
    [REQUEST_TASKS] ({ commit }, search_term: string) {

      let url = 'tasks';

      if (search_term) {
        url += '?description=' + search_term;
      }

      httpClient.get(url)
        .then(response => commit(SET_TASKS, response.data));
    },
    [CREATE_TASK] ({ commit }, task: ITask) {
      return httpClient.post('tasks', task)
        .then(response => commit(CREATE_TASK, response.data));
    },
    [EDIT_TASK] ({ commit }, task: ITask) {
        return httpClient.put(`tasks/${task.id}`, task)
          .then(() => commit(EDIT_TASK, task));
    }
  }
}