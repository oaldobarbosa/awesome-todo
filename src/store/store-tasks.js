import Vue from "vue";
import { uid } from 'quasar'

const state = {
    tasks: {
        ID1: {
        name: "cGo to shop",
        completed: false,
        dueDate: "2021/10/23",
        dueTime: "18:30"
        },
        ID2: {
        name: "bGet bananas",
        completed: false,
        dueDate: "2021/10/24",
        dueTime: "14:30"
        },
        ID3: {
        name: "aGo to metro",
        completed: false,
        dueDate: "2021/10/25",
        dueTime: "12:30"
        },
    },
    search: '',
    sort: 'dueDate'
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
    },
    setSearch(state, value){
        state.search = value
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
    },
    setSearch ({commit}, value){
        commit("setSearch", value);

    }
};

const getters = {
    tasksSorted: (state) => {

        let tasksSorted = {},
            keysOrdered = Object.keys(state.tasks)
        
        keysOrdered.sort((a,b) => {
            let taskAProp = state.tasks[a][state.sort].toLowerCase(),
                taskBProp = state.tasks[b][state.sort].toLowerCase()

            if (taskAProp > taskBProp) return 1
            else if (taskAProp < taskBProp) return -1
            else return 0
        })

        keysOrdered.forEach((key) => {
            tasksSorted[key] = state.tasks[key]
        })
        
        return tasksSorted

    },//search
    tasksFiltered: (state, getters) => {
        let tasksSorted = getters.tasksSorted, 
            tasksFiltered = {}
        if (state.search) {
            //populate empty object
            Object.keys(tasksSorted).forEach(function (key) {
                let task = tasksSorted[key],
                    taskNameLowerCase = task.name.toLowerCase(),
                    searchLowerCase = state.search.toLowerCase()
                if (taskNameLowerCase.includes(searchLowerCase)) {
                    tasksFiltered[key] = task
                }
            })
            return tasksFiltered            
        }
        return tasksSorted
    },//
    tasksTodo: (state, getters) => {
        let tasksFiltered = getters.tasksFiltered
        let tasks = {}
        Object.keys(tasksFiltered).forEach(function(key){
            let task = state.tasks[key]
            if (!task.completed) {
                tasks[key] = task        
            }
        })
        return tasks;
    },
    tasksCompleted: (state, getters) => {
        let tasksFiltered = getters.tasksFiltered
        let tasks = {}
        Object.keys(tasksFiltered).forEach(function(key){
            let task = state.tasks[key]
            if (task.completed) {
                tasks[key] = task        
            }
        })
        return tasks;
    },

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
