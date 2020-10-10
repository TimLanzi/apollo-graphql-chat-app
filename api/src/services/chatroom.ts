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


    const chatroom = new Chatroom({
      creator: uid,
      // name,
      users: [uid, ...memberIDs],
    });

    const message = new Message({
      sender: uid,
      room: chatroom._id,
      content: msg,
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