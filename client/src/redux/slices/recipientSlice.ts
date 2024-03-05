import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { stat } from "fs";
import axios from "../../axios";
import { IUserData } from "./userSlice";

export const getRecipient = createAsyncThunk(
	"recipient/get",
	async (login: string) => {
		const { data } = await axios.get(`/users/user/${login}`);
		return data;
	}
);

export interface IRecipientSlice {
	users: any;
	loading: boolean;
	error: string | null;
}

const initialState: IRecipientSlice = {
	users: [],
	loading: false,
	error: "",
};

export const recipientSlice = createSlice({
	name: "recipient",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getRecipient.pending, (state) => {
				state.loading = true;
				state.users = [];
				state.error = null;
			})
			.addCase(getRecipient.fulfilled, (state, action) => {
				if (!state.users.includes(action.payload)) {
					state.users.push(action.payload);
				}
				// state.users = state.users.concat(action.payload);
				state.loading = false;
				state.error = null;
			})
			.addCase(getRecipient.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message!;
			});
	},
});

export default recipientSlice.reducer;
