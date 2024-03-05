import { Stack } from "react-bootstrap";
import Avatar from '../assets/avatar.svg';

function UserChat(props: any) {
	const {recipient} = props;
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
				<span className="user-online"></span>
			</div>
		</Stack>
	)
}

export default UserChat;