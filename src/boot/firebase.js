import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut, 
  signInWithEmailAndPassword, onAuthStateChanged, } from "firebase/auth";

import { getDatabase, ref, onValue, onChildAdded, onChildChanged, onChildRemoved, set, update, remove, child, get, } from "firebase/database";

//configuração para firebase funcionar no software
const firebaseConfig = {//configuração do app
    apiKey: "AIzaSyB5Adtp-jt0dq8aBoDkzpLeVVWL37BnyqA",
    authDomain: "awesome-todo-7334d.firebaseapp.com",
    databaseURL: "https://awesome-todo-7334d-default-rtdb.firebaseio.com",
    projectId: "awesome-todo-7334d",
    storageBucket: "awesome-todo-7334d.appspot.com",
    messagingSenderId: "102787224537",
    appId: "1:102787224537:web:66075a5560d5e442a97fc8",
    measurementId: "G-ZSYM96CFJR"
};

const app = initializeApp(firebaseConfig);

let firebaseAuth = getAuth(app);//instancia da autenticaç]ap
let firebaseDb = getDatabase(app);//instancia do banco

export { 
  firebaseAuth,
  firebaseDb,
  onValue,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  set,
  update,
  remove,
  child,
  get,
  ref, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut    
}