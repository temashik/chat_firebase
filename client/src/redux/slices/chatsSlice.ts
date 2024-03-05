import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export interface IChatData {
	users: string[];
	chatId: string;
}

export interface IChatsState {
	chats: any;
	loading: boolean;
	error: null | string;
}

export const getAllUserChats = createAsyncThunk(
	"chats/all",
	async (login: string) => {
		const { data } = await axios.get(`/chats/userChats/${login}`);
		return data;
	}
);

const merge = (
	a: IChatData[],
	b: IChatData[],
	predicate = (a: IChatData, b: IChatData) => a === b
) => {
	const c = [...a]; // copy to avoid side effects
	// add all items from B to copy C if they're not already present
	b.forEach((bItem) =>
		c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)
	);
	return c;
};

const initialState: IChatsState = {
	chats: [],
	loading: false,
	error: "",
};

export const chatsSlice = createSlice({
	name: "chats",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllUserChats.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllUserChats.fulfilled, (state, action) => {
				// if (!state.chats.includes(action.payload)) {
				// 	state.chats.push(action.payload);
				// }
				if (state.chats === null || state.chats.length == 0)
					state.chats = action.payload;
				else {
					state.chats = merge(
						state.chats,
						action.payload,
						(a, b) => a.chatId === b.chatId
					);
				}
				state.loading = false;
				state.error = null;
			})
			.addCase(getAllUserChats.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message!;
			});
	},
});

// export const { logout } = userSlice.actions;

export default chatsSlice.reducer;
