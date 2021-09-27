const { checkToken } = require("./jwt");
const sessions = require("../models/SessionsModel");
const { MessageValidation } = require("./validations");
const { isValidObjectId } = require("mongoose");
const messages = require("../models/MessagesModel");

module.exports = function Socket(io) {
	io.on("connection", (socket) => {
		new_user_check(socket);
		send_message_listener(socket);
	});
};

function new_user_check(socket) {
	socket.on("new_connection", async (data) => {
		try {
			let token = await checkToken(data.token);

			const user_session = await sessions.findOneAndUpdate(
				{
					_id: token.session_id,
				},
				{
					socket_id: socket.id,
				}
			);

			socket.emit("connected", {
				ok: true,
			});
		} catch (error) {
			console.log(error);
		}
	});
}

function send_message_listener(socket) {
	socket.on("send_message", async (data) => {
		const socket_session = await sessions.findOne({
			socket_id: socket.id,
		});

		if (!socket_session) return;

		if (
			!(
				data.message_text &&
				data.message_text.length >= 2 &&
				data.message_text.length < 1024
			)
		)
			return;

		if (!isValidObjectId(data.receiver_id)) return;

		const chat = await messages.create({
			message_text: data.message_text,
			owner_id: socket_session.owner_id,
			receiver_id: data.receiver_id,
		});

		let receiver_session = await sessions.find({
			owner_id: data.receiver_id,
		});

		receiver_session = await receiver_session.map((s) => s.socket_id);
		receiver_session = await receiver_session.filter((s) => s);

		socket.to(receiver_session).emit("new_message", data.message_text);
	});
}
