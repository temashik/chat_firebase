const express = require('express');
const { login, register } = require('../controllers/userController');

const UsersRouter = express.Router();

UsersRouter.post('/register', async (req, res) => {
	if (
			!req.body.login ||
			!req.body.firstName ||
			!req.body.lastName ||
			!req.body.password
		) {
			res.json({
				eMsg: "You must fill all fields",
			});
			return;
		}
	const registerResult = await register(req.body.login, req.body.firstName, req.body.lastName, req.body.password);
	if(registerResult.eMsg) {
		res.json(registerResult);
		return;
	}
	res.json(registerResult);
});

UsersRouter.post('/login', async (req, res) => {
	if (!req.body.login || !req.body.password) {
		res.status(403).send({
			message: "You must fill all fields",
		});
		return;
		}
	const loginResult = await login(req.body.login, req.body.password);
	if(loginResult.eMsg) {
		res.status(401).send({
			message: "Incorrect login or password",
		});
		return;
	}
	res.json(loginResult);
});

module.exports = UsersRouter;