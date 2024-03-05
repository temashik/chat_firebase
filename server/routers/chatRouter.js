const express = require('express');
const { createChat, findUserChats, findChat } = require('../controllers/chatController');

const ChatsRouter = express.Router();

ChatsRouter.post('/create', async (req, res) => {
	try {
		const chat = await createChat(req.body.firstUser, req.body.secondUser);
		res.json(chat);
	} catch(e) {
		res.status(500).message(e.message)
	}
});

ChatsRouter.get('/userChats/:user', async (req, res) => {
	try {
		const chats = await findUserChats(req.params.user);
		res.json(chats);
	} catch(e) {
		res.status(500).message(e.message)
	}
});

ChatsRouter.get('/chat/:id', async (req, res) => {
	try {
		const chat = await findChat(req.params.id);
		res.json(chat);
	} catch(e) {
		res.status(500).message(e.message)
	}
})

module.exports = ChatsRouter;