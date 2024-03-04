const express = require('express');
const { createChat, findUserChats, findChat } = require('../controllers/chatController');

const ChatsRouter = express.Router();

ChatsRouter.post('/create', async (req, res) => {
	const chat = await createChat(req.body.firstUser, req.body.secondUser);
	console.log(chat);
});

ChatsRouter.get('/userChats/:user', async (req, res) => {
	const chats = await findUserChats(req.params.user);
	console.log(chats);
});

ChatsRouter.get('/chat/:id', async (req, res) => {
	const chat = await findChat(req.params.id);
	console.log(chat);
})

module.exports = ChatsRouter;