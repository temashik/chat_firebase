const express = require('express');
const cors = require('cors');
const UserRouter = require('./routers/userRouter');
const ChatsRouter = require('./routers/chatRouter');
const MessageRouter = require('./routers/messageRouter');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({origin: true}));
app.use('/users', UserRouter);
app.use('/chats', ChatsRouter);
app.use('/messages', MessageRouter);
const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});