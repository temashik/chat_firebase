import { createSlice } from "@reduxjs/toolkit";
import { IChatData, IChatSlice } from "./newChatSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ICurrentChatSlice extends IChatSlice {
	isNeedUpdate: boolean;
}

const initialState: ICurrentChatSlice = {
	chat: null,
	isNeedUpdate: false,
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
		setIsNeedUpdate: (state) => {
			state.isNeedUpdate = !state.isNeedUpdate;
		},
	},
});

export const { setCurrentChat, setIsNeedUpdate } = currentChatSlice.actions;
export default currentChatSlice.reducer;
