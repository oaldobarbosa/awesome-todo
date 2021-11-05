import { LocalStorage, Loading, } from "quasar";
import { showErrorMessage } from "src/functions/function-show-error-message.js";
import { firebaseAuth, createUserWithEmailAndPassword, signOut,
    signInWithEmailAndPassword, onAuthStateChanged  } from "boot/firebase";

const state = {
    loggedIn: false

};

const mutations = {
    setLoggedIn(state, value) {
        state.loggedIn = value
    }
};

const actions = {
    registerUser({}, payload) {
        createUserWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
            .then(response => {
                console.log('response: ', response);
            })
            .catch(error => {
                showErrorMessage(error.message)
            })
    },
    loginUser({}, payload) {
        Loading.show()
        signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
            .then(response => {
                console.log('response: ', response);
            })
            .catch(error => {
                showErrorMessage(error.message)
            })
    },
    handleAuthStateChange({ commit, dispatch }) {
        onAuthStateChanged(firebaseAuth, user => {
            Loading.hide()
            if (user) {
                commit('setLoggedIn', true)
                LocalStorage.set('loggedIn', true)
                this.$router.push('/').catch(err => {})
                dispatch('tasks/fbReadData', null, { root: true })//ler dados do firebase
            } else {
                commit('setLoggedIn', false)
                LocalStorage.set('loggedIn', false)
                this.$router.replace('/auth').catch(err => {})
            }
        });
    },
    logoutUser(){
        signOut(firebaseAuth);
    },
    
};

const getters = {
    
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
