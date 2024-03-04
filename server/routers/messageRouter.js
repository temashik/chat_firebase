const express = require('express');
const { createMessage, getAllMessages, editMessage, deleteMessage } = require('../controllers/messageController');

const MessageRouter = express.Router();

MessageRouter.post('/create', async (req, res) => {
	try{
		const message = await createMessage(req.body.sender, req.body.chatId, req.body.text);
		res.status(200);
	} catch(e) {
		res.status(500).message(e.message);
	}
});

MessageRouter.get('/all/:chatId', async (req, res) => {
	try {
		const messages = await getAllMessages(req.params.chatId);
		res.json(messages);
	} catch(e) {
		res.status(500).message(e.message);
	}
});

MessageRouter.patch('/edit', async (req, res) => {
	try {
		const result = await editMessage(req.body.msgId, req.body.newText);
		res.status(200);

	} catch(e) {
		res.status(500).message(e.message);

	}
})

MessageRouter.delete('/delete', async (req, res) => {
	try {
		const result = await deleteMessage(req.body.msgId);
		res.status(200);
	} catch(e) {
		res.status(500).message(e.message);
	}
})

module.exports = MessageRouter;