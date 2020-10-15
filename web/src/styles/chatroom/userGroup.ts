import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  userGroup: {
    display: "flex",
    padding: "0.4em 0",
    flexDirection: "column",
  },
  wrap: {
    display: "flex",
  },
  them: {
    // display: "flex",
    flexDirection: "row"
  },
  me: {
    // display: "flex",
    flexDirection: "row-reverse",
  },
  messageAvatar: {
    marginTop: "0.4em"
  },
  avatarWrap: {
    maxWidth: 40,
    flex: 1,
  },
  groupWrap: {
    display: "flex",
    flexDirection: "column",
  },
}));