import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, getRedirectResult } from 'firebase/auth';

const firebaseApp = initializeApp({ /* config */ });
const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, user => { /* check status */ });

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5Adtp-jt0dq8aBoDkzpLeVVWL37BnyqA",
  authDomain: "awesome-todo-7334d.firebaseapp.com",
  databaseURL: "https://awesome-todo-7334d-default-rtdb.firebaseio.com",
  projectId: "awesome-todo-7334d",
  storageBucket: "awesome-todo-7334d.appspot.com",
  messagingSenderId: "102787224537",
  appId: "1:102787224537:web:f57a19cf1de3a0efa97fc8",
  measurementId: "G-64JS58WMCP"
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);

let firebaseAuth = app.auth();

export { firebaseAuth }