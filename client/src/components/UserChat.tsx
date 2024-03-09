import { Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import Avatar from '../assets/avatar.svg';
import { RootState, useAppDispatch } from "../redux/store";
import { useEffect } from "react";
import {getLatestMessage} from '../redux/slices/latestMessageSlice'
import { IChatData } from "../redux/slices/chatsSlice";
function UserChat(props: any) {
	const {recipient, chatId} = props;
	const latestMessages = useSelector((state: RootState) => state.latestMessage.messages);
	const latestMessage = latestMessages.find((el: IChatData) => el.chatId === chatId);
	const isNeedUpdate = useSelector((state: RootState) => state.latestMessage.isNeedUpdate);
	const onlineUsers = useSelector((state: RootState) => state.onlineUsers.users);
	const isDeleteFinished = useSelector((state: RootState) => state.deleteMessage.finished);
	const isEditFinished = useSelector((state: RootState) => state.editMessage.finished);
	const isMediaMessageSend = useSelector((state: RootState) => state.newMediaMessage.finished);
	const newMessage = useSelector((state: RootState) => state.newMessage.message);
	let displayedInfo;
	if (latestMessage === undefined) {
		displayedInfo = {
			text: '',
			date: ''
		}
	} else if (latestMessage.created.seconds === null) {
		displayedInfo = {
		text: latestMessage.text.length > 20 ? latestMessage.text.slice(0, 17) + '...' : latestMessage.text,
		date: latestMessage.created
		}
	} else {
		const timestamp = new Date(latestMessage.created.seconds * 1000 + latestMessage.created.nanoseconds / 1000000);
		const formattedDate = `${(timestamp.getDate() < 10 ? '0' : '') + timestamp.getDate()}.${((timestamp.getMonth() + 1) < 10 ? '0' : '') + (timestamp.getMonth() + 1)}.${timestamp.getFullYear()}`;
		const formattedTime = `${(timestamp.getHours() < 10 ? '0' : '') + timestamp.getHours()}:${(timestamp.getMinutes() < 10 ? '0' : '') + timestamp.getMinutes()}:${(timestamp.getSeconds() < 10 ? '0' : '') + timestamp.getSeconds()}`;

		displayedInfo = {
		text: latestMessage.text.length > 20 ? latestMessage.text.slice(0, 17) + '...' : latestMessage.text,
		date: formattedDate + ", " + formattedTime
	}
	}
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getLatestMessage(chatId));
	}, [])
	useEffect(() => {
		dispatch(getLatestMessage(chatId));
	}, [isNeedUpdate, isDeleteFinished, isEditFinished, newMessage, isMediaMessageSend])
	return(
		<Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between" role="button">
			<div className="d-flex">
				<div className="me-2"><img src={Avatar} height='35px' /></div>
				<div className="text-content">
					{recipient && <div className="name">{recipient?.firstName + " " + recipient?.lastName}</div>}
					<div className="text">{displayedInfo.text}</div>
				</div>
			</div>
			<div className="d-flex flex-column align-items-end">
				<div className="date">
					{displayedInfo.date}
				</div>
				<span className={onlineUsers.some((user) => user?.login === recipient.login) ? "user-online" : ""}></span>
			</div>
		</Stack>
	)
}

export default UserChat;