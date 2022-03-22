import { auth } from "../firebaseConfig"

const ChatMessage = ( {key, message}: any ) => {
    const { text, uid, photoURL } = message  
    const messageType = uid === auth.currentUser?.uid ? 'sent':'received'
    return (
      <>
      <div className={ messageType === 'sent' ? ' flex flex-row-reverse justify-start  items-center' : 'flex justify-start items-center' }>
        <img src={photoURL} alt='ok' className='h-12 rounded-full' />
        <div className={ messageType === 'sent' ? 'bg-blue-500 m-1 max-w-xs w-fit p-3 h-fit rounded-2xl' : 'bg-green-500 m-1 max-w-xs w-fit p-3 rounded-2xl h-fit' }>  
          {text}
        </div>
      </div>
      </>
    )
}

export default ChatMessage