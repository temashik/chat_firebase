import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { getMessages, IMessageData } from "../redux/slices/messagesSlice";
import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { createNewMessage } from '../redux/slices/newMessageSlice'
import SendIcon from '../assets/send.svg';
import AddFileIcon from '../assets/paperclip.svg';

function ChatBox() {
	const currentChat = useSelector((state: RootState) => state.currentChat.chat);
	const messages = useSelector((state: RootState) => state.messages.messages);
	const newMessage = useSelector((state: RootState) => state.newMessage.message);
	const [pointOnAdd, setPointOnAdd] = useState(false);
	const [pointOnSend, setPointOnSend] = useState(false);
	let messagesArray = messages !== undefined ? [...messages].sort((a, b) => {
			if (a.edited) {
				if (b.edited) {
					return a.edited.localeCompare(b.edited);
				} else {
					return a.edited.localeCompare(b.created);
				}
			} else {
				if (b.edited) {
					return a.created.localeCompare(b.edited);
				} else {
					return a.created.localeCompare(b.created);
				}
			}
		}) : null;
	const user = useSelector((state: RootState) => state.user.user);
	const [textMessage, setTextMessage] = useState('');
	const dispatch = useAppDispatch();
	useEffect(() => {
	  if (currentChat) {
		dispatch(getMessages(currentChat!.chatId));
	  }
	}, []);
	useEffect(() => {
	  if (currentChat) {
		dispatch(getMessages(currentChat!.chatId))
	  }
	}, [currentChat, newMessage]);
	if(!currentChat || !user) {
		return (
			<p style={{textAlign: "center", width: "100%"}}>Currently no chat selected</p>
  		)
	}
	if(messages.loading) {
		return (
			<p style={{textAlign: "center", width: "100%"}}>Loading chat</p>
			)
		}
		const recipientLogin = currentChat.users.find((rcp:string) => rcp !=user.login);
		
  return (
   <Stack gap={4} className='chat-box'>
	<div className="chat-header">
		<strong>{recipientLogin}</strong>
	</div>
	<Stack gap={3} className="messages">
		{messagesArray && messagesArray.map((msg: IMessageData, index: number) => {
			return (
			<Stack key={index} className={msg.sender === user.login ? 'message self align-self-end flex-grow-0' : 'message align-self-start flex-grow-0'}>
				<span>{msg.text}</span>
				<span className="message-footer">{msg.edited?.toString() ? 'edited at' + msg.edited.toString() : msg.created.toString()}</span>
			</Stack>
			)
		})}
	</Stack>
	<Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
		<input type='text' placeholder="Type your message" value={textMessage} onChange={(e) => setTextMessage(e.target.value)}/>
		<button className={pointOnAdd ? 'focused-button' :"send-btn"} onMouseOver={() => setPointOnAdd(true)} onMouseOut={() => setPointOnAdd(false)}>
			<img src={AddFileIcon} height='20px' />
		</button>
		<button className={pointOnSend ? 'focused-button' :"send-btn"} onMouseOver={() => setPointOnSend(true)} onMouseOut={() => setPointOnSend(false)} onClick={() => {
			if(textMessage !== ''){
				dispatch(createNewMessage({sender: user.login, chatId: currentChat.chatId, text: textMessage}))
				setTextMessage('');
			}
			}}>
			<img src={SendIcon} height='20px' />
		</button>
	</Stack>
   </Stack>
  );
}

export default ChatBox;
