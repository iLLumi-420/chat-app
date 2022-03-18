import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, addDoc, query, orderBy, limit,Timestamp} from 'firebase/firestore'
import { useRef, useState, useEffect } from 'react'
import { auth, db } from '../firebaseConfig'
import ChatMessage from './ChatMessage'





const Chatroom = () => {
    const dummy = useRef<null | HTMLDivElement>(null)
    const msgReference = collection(db, 'messages')
    const q = query(msgReference, orderBy('createdAt'), limit(25))
    const [inputValue, setInputValue] = useState('')
    const [ messages] = useCollectionData(q)
  
    const _onChange = (e: any) => {
      setInputValue(e.target.value)
    }
  
    const _sendMessage = async (e: any) => {
      e.preventDefault()
      await addDoc(msgReference, {
        text: inputValue,
        createdAt:  Timestamp.now(),
        uid: auth.currentUser?.uid,
        photoURL: auth.currentUser?.photoURL
       })
      setInputValue('')
      dummy.current?.scrollIntoView( {behavior:'smooth'} )
    }
  
  
    return (
      <>
        <div className='flex-col'>
          { messages?.map( msg=> <ChatMessage key={msg.uid} message={msg} />) }
          <div ref={dummy} ></div>
          {dummy.current?.scrollIntoView( {behavior:'smooth'} )}
        </div>
        <form onSubmit={_sendMessage} >
          <input type="text" value={inputValue} onChange={_onChange} 
          className='border-2 border-black focus:outline-none m-1 px-2 py-1 ' />
          <button type='submit'>Send</button> 
        </form>
        <SignOut />
      </>
    )
  }

  const SignOut = () => {
    return (
      <button onClick={()=>{auth.signOut()}} >Sign-Out</button>
    )
  }

export default Chatroom