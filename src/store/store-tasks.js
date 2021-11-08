import Vue from "vue";
import { uid, Notify } from 'quasar'
import { firebaseDb, ref, firebaseAuth, onValue, onChildAdded, onChildChanged, onChildRemoved, set, update, remove, child, get } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";

const state = {
    tasks: {
        // ID1: {
        // name: "cGo to shop",
        // completed: false,
        // dueDate: "2021/10/23",
        // dueTime: "18:30"
        // },
        // ID2: {
        // name: "bGet bananas",
        // completed: false,
        // dueDate: "2021/10/24",
        // dueTime: "14:30"
        // },
        // ID3: {
        // name: "aGo to metro",
        // completed: false,
        // dueDate: "2021/10/25",
        // dueTime: "12:30"
        // },
    },
    search: '',
    sort: 'name',
    tasksDownloaded: false
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
    clearTasks(state) {
        state.tasks = {}
    },
    setSearch(state, value){
        state.search = value
    },
    setSort(state, value){
        state.sort = value
    },
    setTasksDownloaded(state, value){
        state.tasksDownloaded = value
    }
};

const actions = {
    updateTask({ dispatch }, payload) {
        dispatch("fbUpdateTask", payload);
    },
    deleteTask({ dispatch }, id) {
        dispatch("fbDeleteTask", id);
    },
    addTask({ dispatch }, task) {//troquei commit para dispacth
        let taskId = uid();
        let payload = {
            id: taskId,
            task: task
        }
        dispatch("fbAddTask", payload)//troquei commit para dispatck
    },
    setSearch ({commit}, value){ //setar variavel de pesquisa
        commit("setSearch", value);
    },
    setSort ({commit}, value){ //setar variavel de ordenação
        commit("setSort", value);
    },
    fbReadData({ commit }){//ler dados do firebase
        let userID = firebaseAuth.currentUser.uid;//pegar o id do usuário ativo
        const userTasks = ref(firebaseDb, 'tasks/' + userID);

        //set true to read data e retirando tela de loading
        onValue(ref(firebaseDb, 'tasks/' + userID), (snapshot) => {
            commit('setTasksDownloaded', true)
        }, error => {
            showErrorMessage(error.message)
            this.$router.replace('/auth').catch(err => {})
        } );        

        //Child Added
        onChildAdded(userTasks, (snapshot) => { //pegar filhos das tasks do usuario
            let task = snapshot.val();
            let payload = {
                id: snapshot.key,
                task: task
            } 
            commit('addTask', payload)
        });

        //Child Change
        onChildChanged(userTasks, (snapshot) => { //pegar filhos das tasks do usuario e altera
            let task = snapshot.val();
            let payload = {
                id: snapshot.key,
                updates: task
            } 
            commit('updateTask', payload)
        });

        //child delete
        onChildRemoved(userTasks, (snapshot) => { //pegar filhos das tasks do usuario e deleta          
            let taskId =  snapshot.key
            commit('deleteTask', taskId)
        });

    },
    fbAddTask({}, payload){
        let userID = firebaseAuth.currentUser.uid;//pegar o id do usuário ativo
        let taskRef = ref(firebaseDb, 'tasks/' + userID + '/' + payload.id) //referencia da nova task       
        set(taskRef, payload.task) //setando valores no firebase
            .then(() => {
                Notify.create('Task Added!')
            })
            .catch((error) =>{
                showErrorMessage(error.message)
            })
    },
    fbUpdateTask({}, payload){
        let userID = firebaseAuth.currentUser.uid;
        let taskRef = ref(firebaseDb, 'tasks/' + userID + '/' + payload.id)
        update(taskRef, payload.updates) // update valores no firebase
            .then(() => {
                let keys = Object.keys(payload.updates)
                if (!(keys.includes('completed') && keys.length == 1 )) { //verificar se é do tipo completed, se for não notifica
                    Notify.create('Task Updated!')                    
                }
            })
            .catch((error) =>{
                showErrorMessage(error.message)
            })
    },
    fbDeleteTask({} , taskId){
        let userID = firebaseAuth.currentUser.uid;
        let taskRef = ref(firebaseDb, 'tasks/' + userID + '/' + taskId)
        remove(taskRef, taskId)
            .then(() => {
                Notify.create('Task Deleted!')
            })
            .catch((error) =>{
                showErrorMessage(error.message)
            })

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
