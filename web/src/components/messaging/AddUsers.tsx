import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Icon, IconButton, TextField } from "@material-ui/core";
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import { AutoComplete } from "antd";
import { ApolloClient, ApolloConsumer, useLazyQuery } from "@apollo/client";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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

interface Props {
  options: {id: string, username: string}[];
  addUser: (arg: string) => void;
  handleAutoComplete: (value: string, client: ApolloClient<object>) => Promise<void>;
}

export default function AddUsers({ options, addUser, handleAutoComplete }: Props) {
  const classes = useStyles();

  const [search, setSearch] = useState("");

  return (
    <div className={classes.root}>
      {/* <IconButton className={classes.addButton}>
        <AddCircleIcon fontSize="large" />
      </IconButton> */}
      <ApolloConsumer>
        { client => {
          const opts = options.map((res: any) => ({
            id: res.id,
            value: res.username,
          }))

          return (
            <AutoComplete
              options={opts}
              value={search}
              onSearch={value => {
                setSearch(value);
                handleAutoComplete(value, client);
              }}
              onSelect={value => {
                setSearch("");
                addUser(value);
              }}
            >
              <TextField placeholder="Add a user" />
            </AutoComplete>
          )
        }}
      </ApolloConsumer>
    </div>
  )
}