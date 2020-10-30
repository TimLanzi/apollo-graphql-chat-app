import { User, Message, Chatroom } from "../models";
import { IMessage } from "../models/message";
import pubsub from "../services/pubsub";

export async function send({ msg, rid }: any, uid: string): Promise<IMessage> {
  const user = await User.findById(uid);
  if (!user) {
    throw new Error("User not found");
  }

  const room = await Chatroom.findById(rid);
  if (!room) {
    throw new Error("Room not found");
  } else {
    const userInRoom = room.users.find(i => i.toString() === uid.toString());
    if (!userInRoom) {
      throw new Error("Not authorized");
    }
  }

  const message = await new Message({
    sender: uid,
    room: rid,
    content: msg,
    readBy: [uid],
  }).save();

  user.messages.push(message._id);
  room.messages.push(message._id);

  user.save();
  await room.save();

  pubsub.publish(`ROOM_MESSAGE_${rid}`, { newMessageInRoom: room });

  for (const person of room.users) {
    pubsub.publish(`USER_MESSAGE_${person.toString()}`, { newMessageForUser: room });
  }

  return message;
}