import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";

export interface IUserCredentials {
	login: string;
	password: string;
}

export interface IUserData {
	login: string;
	firstName: string;
	lastName: string;
}

export interface IUserState {
	user: IUserData | null;
	loading: boolean;
	error: null | string;
}

export const loginUser = createAsyncThunk(
	"users/login",
	async (creds: IUserCredentials) => {
		const { data } = await axios.post("/users/login", creds);
		console.log("data", data);
		return data;
	}
);

const initialState: IUserState = {
	user: null,
	loading: false,
	error: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.user = null;
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.user = null;
				state.loading = false;
				console.log(action.error.message);
				if (
					action.error.message ==
					"Request failed with status code 403"
				) {
					state.error = "You must fill all fields";
				} else if (
					action.error.message ==
					"Request failed with status code 401"
				) {
					state.error = "Incorrect login or password";
				}
			});
	},
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
