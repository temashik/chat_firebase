const { db } = require("../firebase.js");
const { v4: uuidv4 } = require('uuid');

async function createChat(firstUser, secondUser) {
	const chatRef = db.collection('chat');
	const querySnapshots = await chatRef
	.where('users', 'array-contains-any', [firstUser, secondUser])
	// .where('users', 'array-contains', secondUser)
	.get();
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
			await chatRef.doc(id).set({
				users: [firstUser, secondUser],
				chatId: id
			});
			const chat = await chatRef.doc(id).get();
			return chat.data();
		}
 	} else {
		const id = uuidv4()
		await chatRef.doc(id).set({
			users: [firstUser, secondUser],
			chatId: id
		});
		const chat = await chatRef.doc(id).get();
		return chat.data();
	 }
}

async function findUserChats(user) {
	const chatRef = db.collection('chat');
	const querySnapshots = await chatRef
	.where('users', 'array-contains', user)
	.get();
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
	const chatRef = db.collection('chat');
	const querySnapshots = await chatRef
	.where('id', '==', id)
	.get();
	if (!querySnapshots.empty) {
		return querySnapshots.docs[0].data();
	} else {
		return null;
	}
}

module.exports = { createChat, findUserChats, findChat };