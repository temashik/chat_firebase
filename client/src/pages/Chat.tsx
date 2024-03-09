import { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllUserChats, IChatData } from "../redux/slices/chatsSlice";
import { RootState, useAppDispatch } from "../redux/store";
import UserChat from "../components/UserChat";
import PotentialChats from "../components/PotentialChats";
import ChatBox from "../components/ChatBox";
import { setCurrentChat } from "../redux/slices/currentChatSlice";
import { getAllUsers } from "../redux/slices/allUsersSlice";

function Chat() {
	const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.chats.loading)
  const newChat = useSelector((state: RootState) => state.newChat.chat)
  const chats = useSelector((state: RootState) => state.chats.chats);
  const allUsers = useSelector((state: RootState) => state.allUsers.users);
  const [activeChat, setActiveChat] = useState(50);
	const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllUserChats(user!.login));
    dispatch(getAllUsers());
  }, []);
  useEffect(() => {
    if(newChat != null) {
      dispatch(getAllUserChats(user!.login));
    }
  }, [newChat]);
  return (
    <Container>
      <PotentialChats chats={chats} />
      {chats === null || chats.length < 1  ? null : ( 
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {loading && chats.length > 0 ? <p>Loading</p> :
            chats.map((chat: IChatData, index: number) => {
              const recipientLogin = chat.users.find((rcp:string) => rcp !== user!.login);
              const recipient = allUsers.find((rcp: any) => rcp.login === recipientLogin)
              return(
                <div key={index} className={activeChat === index ?'highlighted-chat' : ''} onClick={() => {
                  dispatch(setCurrentChat(chat));
                  setActiveChat(index);
                }}>
                  <UserChat recipient={recipient} chatId={chat.chatId}/>
                </div>
              )
            })}
          </Stack>
          <ChatBox />
        </Stack> 
        )}
    </Container>
  );
}

export default Chat;
