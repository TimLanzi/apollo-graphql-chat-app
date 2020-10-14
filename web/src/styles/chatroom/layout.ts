import { makeStyles } from "@material-ui/core/styles";
import { drawerWidth } from "../sidebar";

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: "absolute",
    top: 64,
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 0,
    bottom: 60,
    left: drawerWidth,
    right: 0,
  }
}));