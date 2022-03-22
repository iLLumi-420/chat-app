import type { NextPage } from 'next'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import Chatroom from '../components/Chatroom'






const Home: NextPage = () => {
const [user] = useAuthState(auth)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className='flex mx-auto flex-col p-2 md:w-3/5 lg:w-2/5 h-screen'>
        { user?<Chatroom />:<SignIn /> }
      </section>
    </>
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
