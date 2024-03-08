import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export interface IMessageCreds {
	files: any;
	sender: string;
	chatId: string;
	text: string;
}

export const createNewMediaMessage = createAsyncThunk(
	"message/mediaCreate",
	async (creds: IMessageCreds) => {
		// const { data } = await axios.post("/messages/create", creds);
		// const result = await axios.postForm("/messages/create", {
		// 	files: creds.files,
		// 	sender: creds.sender,
		// 	chatId: creds.chatId,
		// 	text: creds.text,
		// });
		const result = await axios.post("/messages/create", creds, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return result.data;
	}
);

export interface IMessageState {
	finished: boolean;
	loading: boolean;
	error: string | null;
}

const initialState: IMessageState = {
	finished: false,
	loading: false,
	error: "",
};

export const newMediaMessageSlice = createSlice({
	name: "newMessage",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createNewMediaMessage.pending, (state) => {
				state.finished = false;
				state.loading = true;
				state.error = null;
			})
			.addCase(createNewMediaMessage.fulfilled, (state, action) => {
				state.finished = true;
				state.loading = false;
				state.error = null;
			})
			.addCase(createNewMediaMessage.rejected, (state, action) => {
				state.finished = false;
				state.loading = false;
				state.error = action.error.message!;
			});
	},
});

export default newMediaMessageSlice.reducer;
