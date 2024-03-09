const express = require('express');
const { createMessage, getAllMessages, editMessage, deleteMessage, getLatestMessage } = require('../controllers/messageController');
// const processFiles = require('../multer');

const multer = require('multer');

const storage = multer.memoryStorage();
let processFiles = multer({storage: storage});
const MessageRouter = express.Router();

MessageRouter.post('/create', processFiles.array('files', 5), async (req, res) => {
	try{
		if (req.files) {
			const message = await createMessage(req.body.sender, req.body.chatId, req.body.text, req.files);
			// res.status(200).send('ok');
			res.json(message);
		} else {
			const message = await createMessage(req.body.sender, req.body.chatId, req.body.text);
			// res.status(200).send('ok');
			res.json(message);
		}
	} catch(e) {
		// console.log(e.message);
		res.status(500).send(e.message);
	}
});

MessageRouter.get('/all/:chatId', async (req, res) => {
	try {
		const messages = await getAllMessages(req.params.chatId);
		res.json(messages);
	} catch(e) {
		// console.log(e.message);
		res.status(500).send(e.message);
	}
});

MessageRouter.patch('/edit', async (req, res) => {
	try {
		const result = await editMessage(req.body.msgId, req.body.newText);
		res.status(200).send('ok');

	} catch(e) {
		res.status(500).send(e.message);

	}
})

MessageRouter.delete('/delete', async (req, res) => {
	try {
		const result = await deleteMessage(req.body.msgId);
		res.status(200).send('ok');
	} catch(e) {
		res.status(500).send(e.message);
	}
})

MessageRouter.get('/latest/:chatId', async (req, res) => {
	try {
		const message = await getLatestMessage(req.params.chatId);
		res.json(message);
	} catch(e) {
		// console.log(e.message);
		res.status(500).send(e.message);
	}
});

module.exports = MessageRouter;