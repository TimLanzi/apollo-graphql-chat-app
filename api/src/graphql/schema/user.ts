
import { User } from "../../models";
import * as UserService from "../../services/user";

export const Queries = {
  session: (parent, args, { user }) => UserService.getUser(user.uid),
  user: (parent, args) => UserService.getUser(args.uid),
  login: (parent, args) => UserService.login(args.username),
  users: (parent, args, { user }) => User.find({
    username: new RegExp(args.query, "ig"),
    _id: { $ne: user.uid },
  }),
};

export const Mutations = {
  createUser: (parent, args) => UserService.register(args.username),
}