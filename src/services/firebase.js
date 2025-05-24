// src/services/firebase.js
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB3TpjND15IXtY4oV4-7FQTJRfOpjsLrpc",
  authDomain: "portfolio-4ad8b.firebaseapp.com",
  databaseURL: "https://portfolio-4ad8b.firebaseio.com",
  projectId: "portfolio-4ad8b",
  storageBucket: "portfolio-4ad8b.appspot.com",
  messagingSenderId: "601043154557",
  appId: "1:601043154557:web:ecbf44661588f267202314"
}

// Only initialize once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
export default firebase
