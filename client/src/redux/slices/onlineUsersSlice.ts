import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IOnlineUser {
	login: string;
	socketId: string;
}

export interface IOnlineUsersState {
	users: IOnlineUser[];
	loading: boolean;
	error: null | string;
}

const initialState: IOnlineUsersState = {
	users: [],
	loading: false,
	error: "",
};

export const onlineUsersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setOnlineUsers: (state, action: PayloadAction<IOnlineUser[]>) => {
			state.users = action.payload;
		},
	},
});

export const { setOnlineUsers } = onlineUsersSlice.actions;

export default onlineUsersSlice.reducer;
