// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getAuth }       from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB3TpjND15IXtY4oV4-7FQTJRfOpjsLrpc",
  authDomain: "portfolio-4ad8b.firebaseapp.com",
  databaseURL: "https://portfolio-4ad8b.firebaseio.com",
  projectId: "portfolio-4ad8b",
  storageBucket: "portfolio-4ad8b.appspot.com",
  messagingSenderId: "601043154557",
  appId: "1:601043154557:web:ecbf44661588f267202314"
}

// Initialize Firebase App (re-use existing if already initialized)
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp()

// Export a Firestore instance
export const db: Firestore = getFirestore(app)
export const auth = getAuth(app)
