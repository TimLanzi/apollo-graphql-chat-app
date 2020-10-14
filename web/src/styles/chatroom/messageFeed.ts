import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  messageFeed: {
    display: "flex",
    // flex: 1,
    flexGrow: 1,
    // width: "100%",
    padding: "1em",
    flexDirection: "column",
    overflow: "auto",
    // maxHeight: "50%",
    minHeight: 0,
    '& div[class*="dayGroup"]:first-child': {
      marginTop: "auto",
    }
  }
}))