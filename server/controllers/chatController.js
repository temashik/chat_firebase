const { db } = require("../firebase.js");
const { v4: uuidv4 } = require('uuid');
const { doc, setDoc, query, collection, where, getDocs, getDoc } = require("firebase/firestore");

async function createChat(firstUser, secondUser) {
	const q = query(collection(db, 'chat'), where('users', 'array-contains-any', [firstUser, secondUser]));
	const querySnapshots = await getDocs(q);
	if (!querySnapshots.empty) {
		const document = [];
		querySnapshots.forEach((doc) => {
			if(doc.data().users.includes(firstUser) && doc.data().users.includes(secondUser)) {
				document.push(doc.data());
			}
		});
		if (document.length > 0) {
			return document[0];
		} else {
			const id = uuidv4()
			await setDoc(doc(db, 'chat', id), {
				users: [firstUser, secondUser],
				chatId: id
			});
			const chat = await getDoc(doc(db, 'chat', id));
			return chat.data();
		}
 	} else {
		const id = uuidv4()
		await setDoc(doc(db, 'chat', id), {
				users: [firstUser, secondUser],
				chatId: id
			});
			const chat = await getDoc(doc(db, 'chat', id));
		return chat.data();
	 }
}

async function findUserChats(user) {
	const q = query(collection(db, 'chat'), where('users', 'array-contains', user));
	const querySnapshots = await getDocs(q);
	if (!querySnapshots.empty) {
		const documents = [];
		querySnapshots.forEach((doc) => {
			documents.push(doc.data());
		});
		return documents;
	} else {
		return null;
	}
}

async function findChat(id) {
	const querySnapshot = await getDoc(doc(db, 'chat', id));
	if (!querySnapshot.empty) {
		return querySnapshot.data();
	} else {
		return null;
	}
}

module.exports = { createChat, findUserChats, findChat };