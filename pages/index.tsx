import type { NextPage } from 'next'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import Chatroom from '../components/Chatroom'






const Home: NextPage = () => {
const [user] = useAuthState(auth)
  return (
    <div className="flex min-h-screen flex-col py-2">
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
      <div>
        <button onClick={_googleSignIn} >Sign-In</button>
      </div>
  )
}

export default Home
