import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/userSlice";
import RecipientReducer from "./slices/recipientSlice";
import ChatReducer from "./slices/chatsSlice";
import AllUsersReducer from "./slices/allUsersSlice";
import NewChatReducer from "./slices/newChatSlice";
import CurrentChatReducer from "./slices/currentChatSlice";
import MessagesReducer from "./slices/messagesSlice";
import { useDispatch } from "react-redux";
import messagesSlice from "./slices/messagesSlice";

export const store = configureStore({
	reducer: {
		user: UserReducer,
		chats: ChatReducer,
		recipient: RecipientReducer,
		allUsers: AllUsersReducer,
		newChat: NewChatReducer,
		currentChat: CurrentChatReducer,
		messages: messagesSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
