import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  root: {
    // width: "100%",
    minHeight: 0,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },
  progress: {
    position: "fixed",
    top: "50%",
    right: "35%",
  }
}))