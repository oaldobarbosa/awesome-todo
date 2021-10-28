import Vue from "vue";
import { uid } from 'quasar'

const state = {
  tasks: {
    // ID1: {
    //   name: "Go to shop",
    //   completed: false,
    //   dueDate: "2021/10/23",
    //   dueTime: "18:30"
    // },
    // ID2: {
    //   name: "Get bananas",
    //   completed: true,
    //   dueDate: "2021/10/24",
    //   dueTime: "14:30"
    // },
    // ID3: {
    //   name: "Go to metro",
    //   completed: false,
    //   dueDate: "2021/10/25",
    //   dueTime: "12:30"
    // }
  }
};

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id);
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  }
};

const actions = {
  updateTask({ commit }, payload) {
    //console.log("update task action");
    commit("updateTask", payload);
  },
  deleteTask({ commit }, id) {
    commit("deleteTask", id);
  },
  addTask({commit}, task) {
    let taskId = uid();
    let payload = {
        id: taskId,
        task: task

    }
    commit("addTask", payload)

  }
};

const getters = {
  tasks: state => {
    return state.tasks;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
