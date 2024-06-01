import { useState, useEffect, useRef } from 'react'
import { FcGoogle } from "react-icons/fc";
import Message from './Message'
import { app } from './firebase'

import { 
  Box, 
  Container, 
  VStack ,
  Button,
  Input,
  HStack
} from '@chakra-ui/react'

import {
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged,
  signOut 
} from 'firebase/auth'

import { 
  getFirestore, 
  addDoc, 
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);


const loginHandler = ()=>{
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider);
}

const logoutHandler = ()=>{
  signOut(auth);
}







function App() {

  const [user, setUser]= useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const divForScroll = useRef(null);

  const submitHandler = async(e)=>{
    e.preventDefault();
  
    try {
      setMessage("");


      await addDoc(collection(db, "Messages"),{
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      })
      divForScroll.current.scrollIntoView({behavior: "smooth"});
    } catch (error) {
      alert(error)
    }
  }



  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"))


    const unsubscribe = onAuthStateChanged(auth, (data)=>{
      setUser(data);
    });

    const unsubscribeForMessage = onSnapshot(q, (snap)=>{
      setMessages(snap.docs.map((item)=>{
        const id = item.id;
        return { id, ...item.data() };
      }))
    });

    return () => {
      unsubscribe();
      unsubscribeForMessage();
      }
  
  },[]);
  
 

  return (
    <Box bg={"red.50"}>
      {
        user ? (<Container h={"100vh"} bg={"white"}>
        <VStack h={"full"}  paddingY={'4'}>
          <Button onClick={logoutHandler} w={"full"} colorScheme='red'>
            Logout
          </Button>

          <VStack 
          h={'full'} 
          w={'full'} 
          bg={'purple.100'} 
          overflowY={'auto'}
          css={{"&::-webkit-scrollbar":{
            display: 'none'
          }}}>
           {
            messages.map(msg=>{
              return <Message 
              key={msg.id} 
              text={msg.text} 
              uri={msg.uri} 
              user={msg.uid===user.uid?"me":"other"}
              />
            })
           }
                      <div ref={divForScroll}></div>

          </VStack>
          <form 
          onSubmit={submitHandler} 
          style={{ width: '100%'}}>
            <HStack>
            <Input 
            value={message} 
            onChange={(e)=> setMessage(e.target.value)}
            bg={"red.50"} 
            placeholder='Enter a message...' />
            <Button type='submit' colorScheme='purple'>Send</Button>
            </HStack>
          </form>

        </VStack>
      </Container>) : <VStack h={'100vh'} justifyContent={'center'} >
      <Button onClick={loginHandler} colorScheme={'purple'}>Sign in with Google &nbsp;<FcGoogle/></Button>
      </VStack> 
      }
    </Box>
  )
}

export default App
