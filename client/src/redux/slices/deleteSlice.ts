import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const deleteNewMessage = createAsyncThunk(
	"message/delete",
	async (msgId: string) => {
		const { data } = await axios.delete("/messages/delete", {
			data: { msgId },
		});
		return data;
	}
);

export interface IDeleteMessageState {
	finished: boolean;
	loading: boolean;
	error: string | null;
}

const initialState: IDeleteMessageState = {
	finished: false,
	loading: false,
	error: "",
};

export const deleteMessageSlice = createSlice({
	name: "deleteMessage",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(deleteNewMessage.pending, (state) => {
				state.finished = false;
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteNewMessage.fulfilled, (state, action) => {
				state.finished = true;
				state.loading = false;
				state.error = null;
			})
			.addCase(deleteNewMessage.rejected, (state, action) => {
				state.finished = false;
				state.loading = false;
				state.error = action.error.message!;
			});
	},
});

export default deleteMessageSlice.reducer;
