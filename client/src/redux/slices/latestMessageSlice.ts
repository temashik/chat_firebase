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

export interface ILatestMessagesState {
	messages: any;
	isNeedUpdate: boolean;
	loading: boolean;
	error: null | string;
}

export const getLatestMessage = createAsyncThunk(
	"messages/latest",
	async (chatId: string) => {
		const { data } = await axios.get(`/messages/latest/${chatId}`);
		return data;
	}
);

const initialState: ILatestMessagesState = {
	messages: [],
	isNeedUpdate: false,
	loading: false,
	error: "",
};

export const latestMessagesSlice = createSlice({
	name: "latest",
	initialState,
	reducers: {
		setIsNeedUpdateLatest: (state) => {
			state.isNeedUpdate = !state.isNeedUpdate;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getLatestMessage.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getLatestMessage.fulfilled, (state, action) => {
				const latestMessageIndex = state.messages.findIndex(
					(el: IMessageData) => el.chatId === action.payload.chatId
				);
				if (latestMessageIndex === -1) {
					state.messages.push(action.payload);
				} else {
					state.messages[latestMessageIndex] = action.payload;
				}
				state.loading = false;
				state.error = null;
			})
			.addCase(getLatestMessage.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message!;
			});
	},
});

export const { setIsNeedUpdateLatest } = latestMessagesSlice.actions;

export default latestMessagesSlice.reducer;
