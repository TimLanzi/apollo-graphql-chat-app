import { Console } from "console";
import * as MessageService from "../../services/messaging";
import pubsub from "../../services/pubsub";

export const Mutations = {
  createMessage: (parent, args, { user }) => {
    if (!user) {
      throw new Error("Not authorized");
    }
    return MessageService.send(args, user.uid);
  }
}

export const Subscriptions = {
  newMessageInRoom: {
    subscribe: (parent, args, { user }) => {
      // console.log(`hello ${args.rid}`)
      return pubsub.asyncIterator(`ROOM_MESSAGE_${args.rid}`)
    },
  }
}