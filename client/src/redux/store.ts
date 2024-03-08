import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/userSlice";
import ChatReducer from "./slices/chatsSlice";
import AllUsersReducer from "./slices/allUsersSlice";
import NewChatReducer from "./slices/newChatSlice";
import CurrentChatReducer from "./slices/currentChatSlice";
import MessagesReducer from "./slices/messagesSlice";
import NewMessageReducer from "./slices/newMessageSlice";
import DeleteMessageReducer from "./slices/deleteSlice";
import EditMessageReducer from "./slices/editSlice";
import NewMediaMessageReducer from "./slices/newMediaMessageSlice";
import OnlineUsersReducer from "./slices/onlineUsersSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
	reducer: {
		user: UserReducer,
		chats: ChatReducer,
		allUsers: AllUsersReducer,
		newChat: NewChatReducer,
		currentChat: CurrentChatReducer,
		messages: MessagesReducer,
		newMessage: NewMessageReducer,
		deleteMessage: DeleteMessageReducer,
		editMessage: EditMessageReducer,
		newMediaMessage: NewMediaMessageReducer,
		onlineUsers: OnlineUsersReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
