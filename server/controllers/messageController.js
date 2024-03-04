const { db } = require("../firebase.js");
const { v4: uuidv4 } = require('uuid');
const { FieldValue } = require("firebase-admin/firestore");

async function createMessage(sender, chatId, text) {
	const msgRef = db.collection('messages');
	const id = uuidv4()
	await msgRef.doc(id).set({
	sender,
	chatId,
	text,
	msgId: id,
	created: FieldValue.serverTimestamp(),
	edited: null
	});
	const chat = await msgRef.doc(id).get();
	return chat.data();

}

async function getAllMessages(chatId) {
	const msgRef = db.collection('messages');
	const querySnapshots = await msgRef.where('chatId', '==', chatId).get();
	const documents = querySnapshots.docs.map((doc) => {
		return {
		sender: doc.data().sender,
		chatId: doc.data().chatId,
		text: doc.data().text,
		msgId: doc.data().msgId,
		created: doc.data().created.toDate().toLocaleString(),
		edited: doc.data().edited ? doc.data().edited.toDate().toLocaleString() : null
		};
	});
	return documents;
}

async function editMessage(msgId, newText) {
	const msgRef = db.collection('messages');
	const result = await msgRef.doc(msgId).set({
		text: newText,
		edited: FieldValue.serverTimestamp()
	}, {merge: true});
	return result;
}

async function deleteMessage(msgId) {
	const msgRef = db.collection('messages');
	const result = await msgRef.doc(msgId).delete();
	return result;
}

module.exports = { createMessage, getAllMessages, editMessage, deleteMessage };