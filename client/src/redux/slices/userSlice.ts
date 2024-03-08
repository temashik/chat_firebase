import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

const user =
	localStorage.getItem("user") === null
		? null
		: JSON.parse(localStorage.getItem("user")!);
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
		return data;
	}
);

const initialState: IUserState = {
	user: user,
	loading: false,
	error: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
			localStorage.removeItem("user");
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
				localStorage.setItem("user", JSON.stringify(state.user));
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.user = null;
				state.loading = false;
				if (
					action.error.message ===
					"Request failed with status code 403"
				) {
					state.error = "You must fill all fields";
				} else if (
					action.error.message ===
					"Request failed with status code 401"
				) {
					state.error = "Incorrect login or password";
				}
			});
	},
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
