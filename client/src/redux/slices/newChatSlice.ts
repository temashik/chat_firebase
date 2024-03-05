import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export interface IChatCreds {
	firstUser: string;
	secondUser: string;
}

export const createNewChat = createAsyncThunk(
	"chat/create",
	async (creds: IChatCreds) => {
		const { data } = await axios.post("/chats/create", creds);
		return data;
	}
);

export interface IChatData {
	users: string[];
	chatId: string;
}

export interface IChatSlice {
	chat: IChatData | null;
	loading: boolean;
	error: string | null;
}

const initialState: IChatSlice = {
	chat: null,
	loading: false,
	error: "",
};

export const newChatSlice = createSlice({
	name: "newChat",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createNewChat.pending, (state) => {
				state.chat = null;
				state.loading = true;
				state.error = null;
			})
			.addCase(createNewChat.fulfilled, (state, action) => {
				state.chat = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(createNewChat.rejected, (state, action) => {
				state.chat = null;
				state.loading = false;
				state.error = action.error.message!;
			});
	},
});

export default newChatSlice.reducer;
