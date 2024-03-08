const { db, storage } = require("../firebase.js");
const { v4: uuidv4 } = require('uuid');
const {ref: storageRef, uploadBytesResumable, getDownloadURL, deleteObject} = require("firebase/storage");
const { doc, setDoc, deleteDoc, query, collection, where, getDocs, getDoc, serverTimestamp } = require("firebase/firestore");

async function createMessage(sender, chatId, text, media=0) {
	const id = uuidv4();
	let mediaURLs = [];
	if (media) {
		await Promise.all(media.map(async (file) => {
			const mediaRef = storageRef(storage, `${file.mimetype}/${id}_${file.originalname}`);
			const metadata = {
				contentType: file.mimetype
			}
			const fileSnapshot = await uploadBytesResumable(mediaRef, file.buffer, metadata);
			const url = await getDownloadURL(fileSnapshot.ref);
			mediaURLs.push({url, ref: `${file.mimetype}/${id}_${file.originalname}`});
		}))
	}
	await setDoc(doc(db, 'messages', id), {
		sender,
		chatId,
		text,
		media: mediaURLs.length > 0 ? mediaURLs : null,
		msgId: id,
		created: serverTimestamp(),
		edited: null
	});
}

async function getAllMessages(chatId) {
	const q = query(collection(db, 'messages'), where('chatId', '==', chatId))
	const querySnapshots = await getDocs(q);
	const documents = querySnapshots.docs.map((doc) => {
		return {
		sender: doc.data().sender,
		chatId: doc.data().chatId,
		text: doc.data().text,
		media: doc.data().media,
		msgId: doc.data().msgId,
		created: doc.data().created.toDate().toLocaleString(),
		edited: doc.data().edited ? doc.data().edited.toDate().toLocaleString() : null
		};
	});
	return documents;
}

async function editMessage(msgId, newText) {
	const result = await setDoc(doc(db, 'messages', msgId), {
		text: newText,
		edited: serverTimestamp()
	}, {merge: true})
	return result;
}

async function deleteMessage(msgId) {
	const querySnapshot = await getDoc(doc(db, 'messages', msgId));
	if(querySnapshot.data().media) {
		querySnapshot.data().media.map(async (element) => {
			const elRef = storageRef(storage, element.ref);
			// console.log(elRef);
			await deleteObject(elRef);
		});
	}
	const result = await deleteDoc(doc(db, 'messages', msgId))
	return result;
}

module.exports = { createMessage, getAllMessages, editMessage, deleteMessage };