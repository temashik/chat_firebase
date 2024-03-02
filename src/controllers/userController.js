const { hash, compare } = require("bcryptjs");
const { db } = require("../firebase.js");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

async function login(login, password) {
	const userRef = db.collection('users');
	const querySnapshot = await userRef.where('login', '==', login).get();
	if (!querySnapshot.empty) {
		const user = querySnapshot.docs[0].data();
		const isPasswordCorrect = await compare(password, user.password);
		if (isPasswordCorrect) {
			return 'Logged in';
		} else {
			return 'Incorrect login or password';
		}
 	} else {
	 	return 'Incorrect login or password'
	 }
}

async function register(login, password) {
 const userRef = db.collection('users');
 const encryptedPassword = await hash(password, Number(process.env.SALT));
 const querySnapshot = await userRef.where('login', '==', login).get();
 if (!querySnapshot.empty) {
	return 'User already exists';
 } else {
	 await userRef.doc(uuidv4()).set({
	login,
	password: encryptedPassword
 })
 return 'Registered';
 }
}

module.exports = { login, register };