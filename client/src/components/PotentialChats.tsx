import { IUserData } from "../redux/slices/userSlice";
import { RootState, useAppDispatch } from "../redux/store";
import {createNewChat} from "../redux/slices/newChatSlice"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../redux/slices/allUsersSlice";

function PotentialChats(props: any) {
	const user = useSelector((state: RootState) => state.user.user);
  const allUsers = useSelector((state: RootState) => state.allUsers.users);

	let potentialChatUsers: any = null;
	if (user && allUsers) {
	    potentialChatUsers = allUsers.filter((potUser: any) => {
			if (potUser.login === user.login) return false;
			if(props.chats == null) return true;
			let isChatCreated = false;
			isChatCreated = props.chats.some((ch: any) => {
				return ch.users[0] === potUser.login || ch.users[1] === potUser.login
			});
			return !isChatCreated;
		});
	  }
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getAllUsers());
  }, []);
	return(
		<>
			<div className="all-users">
				{potentialChatUsers && potentialChatUsers.map((potUser: IUserData, index: number) => {
					return (
						<div className="single-user" key={index} onClick={async () => {
							dispatch(createNewChat({firstUser: user!.login, secondUser: potUser.login}));
						}}>
							{potUser.firstName + " " + potUser.lastName}
							<span className="user-online"></span>
						</div>
					)
				})}
			</div>
		</>
	)
}

export default PotentialChats;