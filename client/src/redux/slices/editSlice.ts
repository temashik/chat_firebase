import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export interface IEditCreds {
	msgId: string;
	newText: string;
}

export const editNewMessage = createAsyncThunk(
	"message/edit",
	async (creds: IEditCreds) => {
		const { data } = await axios.patch("/messages/edit", creds);
		return data;
	}
);

export interface IEditMessageState {
	finished: boolean;
	loading: boolean;
	error: string | null;
}

const initialState: IEditMessageState = {
	finished: false,
	loading: false,
	error: "",
};

export const editMessageSlice = createSlice({
	name: "editMessage",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(editNewMessage.pending, (state) => {
				state.finished = false;
				state.loading = true;
				state.error = null;
			})
			.addCase(editNewMessage.fulfilled, (state, action) => {
				state.finished = true;
				state.loading = false;
				state.error = null;
			})
			.addCase(editNewMessage.rejected, (state, action) => {
				state.finished = false;
				state.loading = false;
				state.error = action.error.message!;
			});
	},
});

export default editMessageSlice.reducer;
