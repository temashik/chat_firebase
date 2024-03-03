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
			return {login: user.login, firstName: user.firstName, lastName: user.lastName};
		} else {
			return {eMsg: 'Incorrect login or password'};
		}
 	} else {
	 	return {eMsg: 'Incorrect login or password'};
	 }
}

async function register(login, firstName, lastName, password) {
 const userRef = db.collection('users');
 const encryptedPassword = await hash(password, Number(process.env.SALT));
 const querySnapshot = await userRef.where('login', '==', login).get();
 if (!querySnapshot.empty) {
	return {eMsg: 'User already exists'};
 } else {
	 await userRef.doc(uuidv4()).set({
	login,
	firstName,
	lastName,
	password: encryptedPassword
 })
 return {msg: 'Registered'};
 }
}

async function getOneUser(login) {
	const userRef = db.collection('users');
	const querySnapshot = await userRef.where('login', '==', login).get();
	if (!querySnapshot.empty) {
		return querySnapshot.docs[0].data();
 	} else {
	 	return {eMsg: 'There is no user with that nickname'};
	 }
}

async function getAllUsers() {
	const userRef = db.collection('users');
	const querySnapshots = await userRef.get();
	return querySnapshots.docs.map(doc => doc.data());
}

module.exports = { login, register, getOneUser, getAllUsers };