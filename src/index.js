const express = require('express');
const cors = require('cors');
const UserRouter = require('./routers/userRouter');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({origin: true}));
app.use('/users', UserRouter);
const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});