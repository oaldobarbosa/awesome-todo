const state = {

    tasks: {
        'ID1': {
            name: "Go to shop",
            completed: false,
            dueDate: '2021/10/23',
            dueTime: '18:30'
        },
        'ID2': {
            name: "Get bananas",
            completed: false,
            dueDate: '2021/10/24',
            dueTime: '14:30'
        },
        'ID3': {
            name: "Go to metro",
            completed: false,
            dueDate: '2021/10/25',
            dueTime: '12:30'
        }
    }

    /* tasks:[
        {
            id: 1,
            name: "Go to shop",
            completed: false,
            dueDate: '2021/10/23',
            dueTime: '18:30'
        },
        {
            id: 2,
            name: "Get bananas",
            completed: false,
            dueDate: '2021/10/24',
            dueTime: '14:30'
        },
        {
            id: 3,
            name: "Go to metro",
            completed: false,
            dueDate: '2021/10/25',
            dueTime: '12:30'
        },
    ] */
    
}

const mutations = {

}

const actions = {

}

const getters = {
    tasks: (state) => {
        return state.tasks
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}