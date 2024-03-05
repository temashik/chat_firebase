import { createSlice } from "@reduxjs/toolkit";
import { IChatData, IChatSlice } from "./newChatSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: IChatSlice = {
	chat: null,
	loading: false,
	error: "",
};

export const currentChatSlice = createSlice({
	name: "currentChat",
	initialState,
	reducers: {
		setCurrentChat: (state, action: PayloadAction<IChatData>) => {
			state.chat = action.payload;
		},
	},
});

export const { setCurrentChat } = currentChatSlice.actions;
export default currentChatSlice.reducer;
