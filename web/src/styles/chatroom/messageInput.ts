import { makeStyles } from "@material-ui/core/styles";
import { drawerWidth } from "../sidebar";

export default makeStyles((theme) => ({
  root: {
    position: "fixed",
    // right: 0,
    bottom: 0,
    padding: "1em",
    backgroundColor: "#fff",
    // left: 0,
    display: "flex",
    // width: "100%"
    width: `calc(100% - ${drawerWidth}px)`,
  },
  input: {
    paddingRight: "0.5em"
  },
  sendButton: {
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    paddingTop: 0,
    paddingBottom: 0,
  }
}));