import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { AutoComplete } from "antd";
import { ApolloClient, ApolloConsumer } from "@apollo/client";
import useStyles from "../../styles/newRoom/addUsers";

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