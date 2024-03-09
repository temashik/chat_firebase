import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { getMessages, IMessageData } from "../redux/slices/messagesSlice";
import { useEffect, useState, ChangeEvent, useRef } from "react";
import { Stack } from "react-bootstrap";
import { createNewMessage } from '../redux/slices/newMessageSlice'
import { deleteNewMessage } from '../redux/slices/deleteSlice'
import { editNewMessage } from '../redux/slices/editSlice'
import { createNewMediaMessage } from '../redux/slices/newMediaMessageSlice'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import SendIcon from '../assets/send.svg';
import AddFileIcon from '../assets/paperclip.svg';

function ChatBox() {
	const currentChat = useSelector((state: RootState) => state.currentChat.chat);
	const isNeedUpdate = useSelector((state: RootState) => state.currentChat.isNeedUpdate);
	const messages = useSelector((state: RootState) => state.messages.messages);
	const isDeleteFinished = useSelector((state: RootState) => state.deleteMessage.finished);
	const isEditFinished = useSelector((state: RootState) => state.editMessage.finished);
	const isMediaMessageSend = useSelector((state: RootState) => state.newMediaMessage.finished);
	const newMessage = useSelector((state: RootState) => state.newMessage.message);
	const [pointOnAdd, setPointOnAdd] = useState(false);
	const [pointOnSend, setPointOnSend] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [fileList, setFileList] = useState<FileList | null>(null);
	const scroll = useRef<null | HTMLDivElement>(null);
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
	const [messageId, setMessageId] = useState("");
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  	const open = Boolean(anchorEl);
  	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    	setAnchorEl(event.currentTarget);
  	};
 	 const handleClose = () => {
    	setAnchorEl(null);
  	};
	const handleDelete = (deleteMessageId: string, text: string) => {
		dispatch(deleteNewMessage(deleteMessageId));
		setAnchorEl(null);
	}
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFileList(e.target.files);
	}
	const handleSendClick = () => {
		if(isEdit) {
			if(textMessage !== ''){
				dispatch(editNewMessage({msgId: messageId, newText: textMessage}))
				setIsEdit(false);
				setMessageId("");
				setTextMessage('');
			}
		} else if(fileList && user && currentChat) {
			const form: any = new FormData();
			for (let index = 0; index < fileList.length; index++) {
				form.append('files', fileList[index])
			}
			form.append('sender', user?.login);
			form.append('chatId', currentChat?.chatId);
			form.append('text', textMessage);
			dispatch(createNewMediaMessage(form));
			setFileList(null)
			setTextMessage('');
		} else {
			if(textMessage !== '' && user && currentChat){
				dispatch(createNewMessage({sender: user.login, chatId: currentChat.chatId, text: textMessage}))
				setTextMessage('');
			}
		}
	}
	const dispatch = useAppDispatch();
	useEffect(() => {
	  if (currentChat) {
		dispatch(getMessages(currentChat!.chatId));
	  }
	}, []);
	useEffect(() => {
		scroll.current?.scrollIntoView({behavior: "smooth"})
	}, [newMessage, currentChat, isNeedUpdate, messages])
	useEffect(() => {
	  if (currentChat) {
		dispatch(getMessages(currentChat!.chatId))
	  }
	}, [currentChat, newMessage, isDeleteFinished, isEditFinished, isMediaMessageSend, isNeedUpdate]);
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
			<Stack key={msg.msgId + index} ref={scroll} className={msg.sender === user.login ? 'message self align-self-end flex-grow-0' : 'message align-self-start flex-grow-0'}>
				{msg.media && msg.media.map((item: any) => {
					const type = item.ref.split('/')[0];
					const ext = item.ref.split('/')[1];
					if (type === 'image') {
						return <img key={item.url} src={item.url} />
					} else if (type === 'video') {
						return (<video controls key={item.url} width="100%">
					      <source src={item.url} type={"video/" + ext} />
					      Sorry, your browser doesn't support videos.
					    </video>)
					}
					})
				}
				<span>{msg.text}</span>
				<Stack key={msg.msgId} direction='horizontal'>
				<span className="message-footer">{msg.edited?.toString() ? 'edited at ' + msg.edited.toString() : msg.created.toString()}</span>
				<IconButton
			        aria-label="more"
					key={"fade-button" + msg.msgId}
			        id={"fade-button" + msg.msgId}
			        aria-controls={open ? 'long-menu' : undefined}
			        aria-expanded={open ? 'true' : undefined}
			        aria-haspopup="true"
			        onClick={handleClick}
			    >
        <MoreVertIcon />
      </IconButton>
	  </Stack>
				<Menu
					key={"fade-menu" + msg.msgId}
			        id={"fade-menu" + msg.msgId}
			        MenuListProps={{
			          'aria-labelledby': 'fade-button' + msg.msgId,
			        }}
			        anchorEl={anchorEl}
			        open={open}
			        onClose={handleClose}
			        TransitionComponent={Fade}
			      >
			      <MenuItem key={'edit' + msg.msgId} onClick={() => {
					if(user.login === msg.sender) {		/// can edit only own messages
						setIsEdit(true);
						setMessageId(msg.msgId)
						setTextMessage(msg.text);
						setAnchorEl(null);
					} else {
						setAnchorEl(null);
					}
				  }}>Edit</MenuItem>
			      <MenuItem key={'delete' + msg.msgId} onClick={() => {handleDelete(msg.msgId, msg.text)}}>Delete</MenuItem>
			    </Menu>
			</Stack>
			)
		})}
	</Stack>
	<Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
		<input type='text' placeholder="Type your message" value={textMessage} onChange={(e) => setTextMessage(e.target.value)}/>
		<label htmlFor="file-upload" className={pointOnAdd ? 'focused-button' :"send-btn"} onMouseOver={() => setPointOnAdd(true)} onMouseOut={() => setPointOnAdd(false)}>
			<img className="add-file" src={AddFileIcon} />
		</label>
		<input id="file-upload" type="file" onChange={handleFileChange} multiple />
		<button className={pointOnSend ? 'focused-button' :"send-btn"} onMouseOver={() => setPointOnSend(true)} onMouseOut={() => setPointOnSend(false)} onClick={() => 
		handleSendClick()}>
			<img src={SendIcon} height='20px' />
		</button>
	</Stack>
   </Stack>
  );
}

export default ChatBox;
