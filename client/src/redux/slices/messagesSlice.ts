import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export interface IMessageData {
	chatId: string;
	created: Date;
	edited: Date | null;
	msgId: string;
	sender: string;
	text: string;
	media?: any;
}

export interface IMessagesState {
	messages: any;
	loading: boolean;
	error: null | string;
}

export const getMessages = createAsyncThunk(
	"messages/get",
	async (chatId: string) => {
		const { data } = await axios.get(`/messages/all/${chatId}`);
		return data;
	}
);

const merge = (
	a: IMessageData[],
	b: IMessageData[],
	predicate = (a: IMessageData, b: IMessageData) => a === b
) => {
	const c = [...a]; // copy to avoid side effects
	// add all items from B to copy C if they're not already present
	b.forEach((bItem) =>
		c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)
	);
	return c;
};

const initialState: IMessagesState = {
	messages: [],
	loading: false,
	error: "",
};

export const messagesSlice = createSlice({
	name: "chats",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMessages.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getMessages.fulfilled, (state, action) => {
				// if (state.messages === null || state.messages.length == 0)
				// 	state.messages = action.payload;
				// else {
				// 	state.messages = merge(
				// 		state.messages,
				// 		action.payload,
				// 		(a, b) => a.msgId === b.msgId
				// 	);
				// }
				state.messages = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(getMessages.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message!;
			});
	},
});

export default messagesSlice.reducer;
