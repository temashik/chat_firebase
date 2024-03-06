import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { IMessageData } from "./messagesSlice";

export interface IMessageCreds {
	sender: string;
	chatId: string;
	text: string;
}

export const createNewMessage = createAsyncThunk(
	"message/create",
	async (creds: IMessageCreds) => {
		const { data } = await axios.post("/messages/create", creds);
		return data;
	}
);

export interface IMessageState {
	message: IMessageData | null;
	loading: boolean;
	error: string | null;
}

const initialState: IMessageState = {
	message: null,
	loading: false,
	error: "",
};

export const newMessageSlice = createSlice({
	name: "newMessage",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createNewMessage.pending, (state) => {
				state.message = null;
				state.loading = true;
				state.error = null;
			})
			.addCase(createNewMessage.fulfilled, (state, action) => {
				state.message = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(createNewMessage.rejected, (state, action) => {
				state.message = null;
				state.loading = false;
				state.error = action.error.message!;
			});
	},
});

export default newMessageSlice.reducer;
