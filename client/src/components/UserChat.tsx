import { Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import Avatar from '../assets/avatar.svg';
import { RootState } from "../redux/store";

function UserChat(props: any) {
	const {recipient} = props;
	const onlineUsers = useSelector((state: RootState) => state.onlineUsers.users);
	return(
		<Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between" role="button">
			<div className="d-flex">
				<div className="me-2"><img src={Avatar} height='35px' /></div>
				<div className="text-content">
					{recipient && <div className="name">{recipient?.firstName + " " + recipient?.lastName}</div>}
					<div className="text">Text Message</div>
				</div>
			</div>
			<div className="d-flex flex-column align-items-end">
				<div className="date">
					12/12/2012
				</div>
				<div className="this-user-notifications">2</div>
				<span className={onlineUsers.some((user) => user?.login === recipient.login) ? "user-online" : ""}></span>
			</div>
		</Stack>
	)
}

export default UserChat;