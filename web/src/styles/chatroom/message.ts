import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  message: {
    // display: "flex",
    // width: "80%",
    // maxWidth: "80%",
    marginTop: "0.2em",
    marginLeft: "1em",
    marginRight: "1em",
    textAlign: "left",
    padding: "1em",
    borderRadius: "500em",
    boxShadow: "0 2px 6px 2px #b2b2b2",
    overflowWrap: "anywhere"
    // fontSize: "1em",
  },
  mine: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    // justifyContent: "right"
    marginLeft: "auto",
    // justifySelf: "right",
    // flexDirection: "row-reverse"
  },
  them: {
    backgroundColor: "#ddd",
    color: "#000",
    marginRight: "auto"
  },
  minute: {
    color: "#888"
  },
  meWrap: {
    position: "relative",
    marginLeft: "auto",
  },
  themWrap: {
    position: "relative",
    marginRight: "auto",
  },
  meTime: {
    position: "absolute",
    top: "45%",
    left: "-5.4em",
  },
  themTime: {
    position: "absolute",
    top: "45%",
    right: "-5.4em",
  },
}))