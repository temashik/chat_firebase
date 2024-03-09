const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:3000" });

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log('socket id ',socket.id);
	// listen to a new online user
  socket.on('addNewUser', (login) => {
	!onlineUsers.some(user => user.login === login) &&
	onlineUsers.push({login, socketId: socket.id});
	console.log(onlineUsers);

	io.emit('getOnlineUsers', onlineUsers);
  });

  // listen to new message
  socket.on('sendMessage', (data) => {
	const onlineUser = onlineUsers.find(user => user.login == data.recipientLogin);
	if (onlineUser) {
		io.to(onlineUser.socketId).emit('getMessage', data.message);
	}
  })

  socket.on('disconnect', () => {
	onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
	io.emit('getOnlineUsers', onlineUsers);
  })
});

io.listen(4000);