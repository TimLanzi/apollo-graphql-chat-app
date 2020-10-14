import { User, Chatroom, Message } from "../models";
// import { Socket } from "socket.io";
import { IChatroom } from "../models/chatroom";
import pubsub from "../services/pubsub";

export async function create(uid: string, memberIDs: string[], msg: string): Promise<IChatroom> {
  try {
    const user = await User.findById(uid);
    if (!user) {
      // error
      throw new Error("User not found.");
      // return;
    }

    const members = await User.find({ _id: { $in: memberIDs }});
    if (members.length <= 0) {
      // error
      throw new Error("No users could be found");
      // return;
    }

    // const name = members.length === 1
    //   ? `${user.username} - ${members[0].username}`
    //   : `${user.username}, ${members.map(i => i.username).join(", ")}`

    const exists = await Chatroom.findOne({ users: [uid, ...memberIDs], $where: `this.users.length == ${memberIDs.length + 1}` });
    if (exists) {
      const message = new Message({
        sender: uid,
        room: exists._id,
        content: msg,
        readBy: [uid],
      });

      exists.messages.push(message._id);
      user.messages.push(message._id);

      await message.save();
      await user.save();
      await exists.save();

      pubsub.publish(`ROOM_MESSAGE_${exists._id}`, { newMessageInRoom: message });

      return exists;
    }


    const chatroom = new Chatroom({
      creator: uid,
      // name,
      users: [uid, ...memberIDs],
    });

    const message = new Message({
      sender: uid,
      room: chatroom._id,
      content: msg,
      readBy: [uid],
    });

    chatroom.messages.push(message._id);

    user.chatrooms.push(chatroom._id);
    user.messages.push(message._id);

    message.save();
    user.save();

    for (let member of members) {
      member.chatrooms.push(chatroom._id);
      member.save();
    }

    for (let id of memberIDs) {
      pubsub.publish(`NEW_ROOM_${id}`, { newRoomCreated: chatroom });
    }
    
    await chatroom.save();

    return chatroom;
  } catch (e) {
    throw e;
  }
}

export async function addUser(uid: string, rid: string): Promise<IChatroom> {
  const user = await User.findById(uid)
  if (!user) {
    // error
    // return
    throw new Error("User not found.");
  }

  const room = await Chatroom.findById(rid);
  if (!room) {
    throw new Error("Room not found");
  }

  user.chatrooms.push(rid);
  user.save();

  room.users.push(uid);
  await room.save();

  return room;

  // socket.uid = uid.toString();

  // for (let room of user.chatrooms) {
    // if (rooms[room.toString()] === undefined) {
    //   rooms[room.toString()] = [user._id.toString()]
    // } else {
    //   rooms[room.toString()].push(user._id.toString());
    // }

    // socket.join(room.toString());
  // }

  // socket.rooms = user.chatrooms.map(i => i.toString());
}

export async function markMessages(rid: string, uid: string): Promise<IChatroom> {
  const messages = await Message.find({ room: rid });

  for (const message of messages) {
    if (message.readBy.findIndex(item => item.toString() === uid) === -1) {
      message.readBy.push(uid);
      await message.save();
    }
  }

  const room = await Chatroom.findById(rid);
  if (!room) {
    throw new Error("Room not found");
  }

  return room;
}