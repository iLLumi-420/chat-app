import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, addDoc, query, orderBy, limit,Timestamp} from 'firebase/firestore'
import { useRef, useState, useEffect } from 'react'
import { auth, db } from '../firebaseConfig'
import ChatMessage from './ChatMessage'

import { ArrowRightIcon, CameraIcon, PhotographIcon, MicrophoneIcon  } from "@heroicons/react/solid"


const Chatroom = () => {
    const dummy = useRef<null | HTMLDivElement>(null)
    dummy.current?.scrollIntoView( {behavior:'smooth'} )
    const msgReference = collection(db, 'messages')
    const q = query(msgReference, orderBy('createdAt', 'desc'), limit(25))
    const [inputValue, setInputValue] = useState('')
    const [ messages ] = useCollectionData(q)
  
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
      <div className=' bg-purple-800 rounded-md px-2 flex flex-col h-full '>
        <div className='flex flex-col-reverse overflow-y-scroll whitespace-nowrap'>
          <div ref={dummy} ></div>
          { messages?.map( msg=> <ChatMessage key={msg.uid} message={msg} />) }
        </div>
        <form onSubmit={_sendMessage} className='mt-auto flex items-center sticky top-10' >
          <CameraIcon className='h-8 w-8 text-black mx-1 cursor-pointer' />
          <PhotographIcon className='h-8 w-8 text-black mx-1 cursor-pointer' />
          <MicrophoneIcon className='h-8 w-8 text-black mx-1 cursor-pointer' />
          <input type="text" value={inputValue} onChange={_onChange} 
          className='border-2 border-black rounded-2xl focus:outline-none m-1 px-2 py-2 w-full ' />
          <button type='submit'> <ArrowRightIcon className=' h-6 w-6 text-black m-1' /> </button> 
        </form>
      </div>
    )
  }

  const SignOut = () => {
    return (
      <button onClick={()=>{auth.signOut()}} >Sign-Out</button>
    )
  }

export default Chatroom