import { auth } from "../firebaseConfig"

const ChatMessage = ( {key, message}: any ) => {
    const { text, uid, photoURL } = message  
    const messageType = uid === auth.currentUser?.uid ? 'sent':'received'
    return (
      <>
      <div className={ messageType === 'sent' ? ' flex flex-row-reverse justify-start  items-center' : 'flex justify-start items-center' }>
        <div className="photoContainer">
          <img src={photoURL} alt="No" className='h-12 rounded-full' />
        </div>
        <div className={ messageType === 'sent' ? 'bg-blue-500 m-1 w-max max-w-screen-sm p-2 rounded-full h-10' : 'bg-green-500 m-1 w-max max-w-screen-sm p-2 rounded-full h-10' }>  
          {text}
        </div>
      </div>
      </>
    )
}

export default ChatMessage