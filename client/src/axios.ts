import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:8000",
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
	},
});

export async function registerRequest(
	login: string,
	firstName: string,
	lastName: string,
	password: string
): Promise<any> {
	const { data } = await axios.post("/users/register", {
		login,
		firstName,
		lastName,
		password,
	});
	return data;
}

export default instance;
