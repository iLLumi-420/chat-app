import type { NextPage } from 'next'
import Head from 'next/head'
import firebase,{initializeApp} from "firebase/app";
import { getFirestore, collection, addDoc, query, where, orderBy, limit } from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDeaV2Xv3OL2S8n-4LpqS6i261nVnJ9npg",
  authDomain: "chat-app-12983.firebaseapp.com",
  projectId: "chat-app-12983",
  storageBucket: "chat-app-12983.appspot.com",
  messagingSenderId: "213777552210",
  appId: "1:213777552210:web:b6c14884fd3f4cbadb608b"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

const Home: NextPage = () => {
  const [user] = useAuthState(auth)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        { user?<Chatroom />:<SignIn /> }
      </section>
      
    </div>
  )
}


const SignIn = () => {
    const _googleSignIn = () => {
      const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider)
  }

  return (
      <button onClick={_googleSignIn} >Sign-In</button>
  )
}

const signOut = () => {
  return auth.currentUser && (
    <button onClick={()=>{auth.signOut}} >Sign-Out</button>
  )
} 

const Chatroom = () => {
  const msgReference = collection(db, 'messages')
  const q = query(msgReference, orderBy('createdAt'), limit(25))

  const [ messages, error ] = useCollectionData(q)
  if(error){
    console.log(error)
  }


  return (
    <>
      <div>
        { messages?.map( msg=> <ChatMessage key={msg.id} message={msg} />) }
        ok
      </div>
    </>
  )
}

const ChatMessage = ( {key, message}: any ) => {
  const { text } = message
  return (
    <>
    <div>
      { text }
    </div>
    </>
  )
}



export default Home
