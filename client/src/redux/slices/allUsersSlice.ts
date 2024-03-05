import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { IUserData } from "./userSlice";

export const getAllUsers = createAsyncThunk("allUsers/get", async () => {
	const { data } = await axios.get("/users/users");
	return data;
});

export interface IAllUsers {
	users: any;
	loading: boolean;
	error: string | null;
}

const initialState: IAllUsers = {
	users: [],
	loading: false,
	error: "",
};

export const allUsersSlice = createSlice({
	name: "allUsers",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllUsers.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllUsers.fulfilled, (state, action) => {
				state.users = action.payload;
				state.loading = false;
			})
			.addCase(getAllUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message!;
			});
	},
});

export default allUsersSlice.reducer;
