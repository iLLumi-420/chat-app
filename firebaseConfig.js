import {initializeApp} from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDeaV2Xv3OL2S8n-4LpqS6i261nVnJ9npg",
    authDomain: "chat-app-12983.firebaseapp.com",
    projectId: "chat-app-12983",
    storageBucket: "chat-app-12983.appspot.com",
    messagingSenderId: "213777552210",
    appId: "1:213777552210:web:b6c14884fd3f4cbadb608b"
  };


export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore()
