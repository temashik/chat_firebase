const { hash, compare } = require("bcryptjs");
const { db } = require("../firebase.js");
const { v4: uuidv4 } = require('uuid');
const { doc, setDoc, query, collection, where, getDocs } = require("firebase/firestore");
require('dotenv').config();

async function login(login, password) {
	const q = query(collection(db, 'users'), where('login', '==', login))
	const querySnapshots = await getDocs(q);
	if (!querySnapshots.empty) {
		const user = querySnapshots.docs[0].data();
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
 	const encryptedPassword = await hash(password, Number(process.env.SALT));
	const q = query(collection(db, 'users'), where('login', '==', login))
	const querySnapshot = await getDocs(q);
	if (!querySnapshot.empty) {
		return {eMsg: 'User already exists'};
	} else {
		await setDoc(doc(db, 'users', uuidv4()), {
		login,
		firstName,
		lastName,
		password: encryptedPassword
	})
	return {msg: 'Registered'};
	}
}

async function getOneUser(login) {
	const q = query(collection(db, 'users'), where('login', '==', login));
	const querySnapshots = await getDocs(q);
	if (!querySnapshots.empty) {
		return querySnapshots.docs[0].data();
	} else {
		return {eMsg: 'There is no user with that nickname'};
	}
}

async function getAllUsers() {
	const querySnapshots = await getDocs(query(collection(db, 'users')));
	return querySnapshots.docs.map(doc => doc.data());
}

module.exports = { login, register, getOneUser, getAllUsers };