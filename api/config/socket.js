const server = require("../utils/server");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const passport = require("passport");
const checkAuthSocket = (socket, next) =>
  passport.authenticate("jwt", { session: false })(socket.request, {}, next);
io.use(checkAuthSocket);
const mongoose = require("mongoose");

const Chat = require("../models/chat");

// rec from to message
// send between data
io.on("connection", (socket) => {
  const userId = socket.request.user._id.toString();
  socket.join(userId);

  socket.on("message", (data) => {
    const messageId = new mongoose.Types.ObjectId();
    const newMessage = {
      from: data.from,
      content: data.message,
      _id: messageId,
    };
    Chat.updateOne(
      { between: { $all: [data.to, data.from] } },
      { $push: { messages: newMessage } }
    ).then((doc) => {
      if (!doc.matchedCount) {
        const chat = new Chat({
          between: [data.to, data.from],
          messages: [newMessage],
        });
        chat.save();
      }
    });
    io.to(data.to)
      .to(data.from)
      .emit("message", { between: [data.to, data.from], data: newMessage });
  });
});
