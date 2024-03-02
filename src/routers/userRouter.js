const express = require('express');
const { login, register } = require('../controllers/userController');

const UsersRouter = express.Router();

UsersRouter.post('/register', async (req, res) => {
	const registerResult = await register(req.body.login, req.body.password);
	console.log(registerResult);
});

UsersRouter.post('/login', async (req, res) => {
	const loginResult = await login(req.body.login, req.body.password);
	console.log(loginResult);
});

module.exports = UsersRouter;