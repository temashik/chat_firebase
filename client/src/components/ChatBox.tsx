import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { getMessages, IMessageData } from "../redux/slices/messagesSlice";
import { useEffect } from "react";
import { Stack } from "react-bootstrap";

function ChatBox() {
	const currentChat = useSelector((state: RootState) => state.currentChat.chat);
	const messages = useSelector((state: RootState) => state.messages.messages);
	const user = useSelector((state: RootState) => state.user.user);
	const dispatch = useAppDispatch();
	useEffect(() => {
	  if (currentChat) {
		dispatch(getMessages(currentChat!.chatId));
	  }
	  console.log('chat', messages.text);
	}, [currentChat]);
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
		{messages && messages.map((msg: IMessageData, index: number) => {
			return (
			<Stack key={index} className={msg.sender === user.login ? 'message self align-self-end flex-grow-0' : 'message align-self-start flex-grow-0'}>
				<span>{msg.text}</span>
				<span className="message-footer">{msg.edited?.toString() ? 'edited at' + msg.edited.toString() : msg.created.toString()}</span>
			</Stack>
			)
		})}
	</Stack>
   </Stack>
  );
}

export default ChatBox;
