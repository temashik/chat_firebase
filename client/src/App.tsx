import {Routes, Route, Navigate} from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "react-bootstrap"
import { useSelector } from 'react-redux'
import NavigationBar from './components/NavigationBar';
import { RootState, useAppDispatch } from './redux/store';
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from 'react';
import {setOnlineUsers} from './redux/slices/onlineUsersSlice';
import {setIsNeedUpdate} from './redux/slices/currentChatSlice';
import {setIsNeedUpdateLatest} from './redux/slices/latestMessageSlice';

function App() {
  const user = useSelector((state: RootState) => state.user.user);
  const currentChat = useSelector((state: RootState) => state.currentChat.chat);
  const newMessage = useSelector((state: RootState) => state.newMessage.message);
  const newMediaMessage = useSelector((state: RootState) => state.newMediaMessage.message);
  const isDeleteFinished = useSelector((state: RootState) => state.deleteMessage.finished);
	const isEditFinished = useSelector((state: RootState) => state.editMessage.finished);
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useAppDispatch()
  
  // socket init
  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect()
    }
  }, [user]);
  // add online user
  useEffect(() => {
    if (socket === null) return;
    socket?.emit('addNewUser', user?.login);
    socket.on('getOnlineUsers', (res) => {
      dispatch(setOnlineUsers(res));
    });

    return () => {
      socket.off('getOnlineUsers');
    }
  }, [socket])
  // send message
  useEffect(() => {
    if (socket === null) return;
      if(isDeleteFinished || isEditFinished) {
        const recipientLogin = currentChat?.users.find((rcpUser) => rcpUser !== user?.login)
        socket.emit('sendMessage', {message: null, recipientLogin})
      } else if(newMessage) {
        const recipientLogin = currentChat?.users.find((rcpUser) => rcpUser !== user?.login)
        socket.emit('sendMessage', {message: newMessage, recipientLogin})
      } else if(newMediaMessage) {
        const recipientLogin = currentChat?.users.find((rcpUser) => rcpUser !== user?.login)
        socket.emit('sendMessage', {message: newMediaMessage, recipientLogin})
      } else return;
    
  }, [newMediaMessage, newMessage, isDeleteFinished, isEditFinished])
  // recieve message
  useEffect(() => {
    if (socket === null) return;
    socket.on('getMessage', (message) => {
      if(currentChat && message === null) {
        dispatch(setIsNeedUpdate());
        dispatch(setIsNeedUpdateLatest());
      } else if (currentChat?.chatId === message.chatId) {
        dispatch(setIsNeedUpdate());
        dispatch(setIsNeedUpdateLatest());
      } else {
        dispatch(setIsNeedUpdateLatest());
      }
    })
    return () => {
      socket.off('getMessage');
    }

  }, [socket, currentChat])
  return (
    <>
      <NavigationBar />
      <Container>
        <Routes>
          <Route path = '/' element = {user ? <Chat /> : <Navigate to="/login" />}></Route>
          <Route path = '/register' element = {user ? <Navigate to="/" /> : <Register />}></Route>
          <Route path = '/login' element = {user ? <Navigate to="/" /> : <Login />}></Route>
          <Route path = '*' element = {<Navigate to="/" />}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
