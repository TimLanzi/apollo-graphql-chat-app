import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    // position: "absolute",
    display: "flex",
    flexDirection: "column",
    // width: `calc(100% - ${drawerWidth}px)`,
    width: "100%",
    backgroundColor: "#fff",
    padding: "1em",
  },
  addButton: {
    // float: "right",
    // right: 0
  }
}))