import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ApolloClient, gql, useMutation } from "@apollo/client";
import { CREATE_CHATROOM, SEARCH_FOR_USERS } from "../../graphql/messaging";
import MessageInput from "./MessageInput";
import AddUsers from "./AddUsers";
import UsersList from "./UsersList";
import { create } from "domain";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // position: "relative",
    // width: `calc(100% - ${drawerWidth}px)`,
    width: "100%"
  }
}))

interface Props {
  setRoom: (arg: string) => void;
}

export default function MakeNewRoom({ setRoom }: Props) {
  const classes = useStyles();

  const [makeRoom, { loading, error, data }] = useMutation(CREATE_CHATROOM, {
    update: (cache, { data: { createChatroom }}) => {
      cache.modify({
        fields: {
          sessionChatrooms(existing) {
            const newRef = cache.writeFragment({
              data: createChatroom,
              fragment: gql`
                fragment NewRoom on Chatroom {
                  chatrooms {
                    id
                    name
                    users {
                      id
                      username
                    }
                    lastMessage {
                      id
                      sender {
                        id
                        username
                      }
                      timestamp
                      content
                    }
                  }
                }
              `
            });
            return [...existing, newRef];
          }
        }
      })
    }
  });
  
  const [message, setMessage] = useState("");
  const [options, setOptions] = useState<{id: string, username: string}[]>([]);
  const [users, setUsers] = useState<{id: string, username: string}[]>([]);

  useEffect(() => {
    if (!loading) {
      if (error) {
        // TODO
        // console.log({ error, message: error.message })
      } else if (data) {
        console.log(data)
        setRoom(data.createChatroom.id);
      }
    }
  }, [loading, error, data]);

  function addUserToRoom(username: string) {
    const user = options.find(item => item.username === username);
    if (user) {
      setUsers(prev => [
        ...prev,
        user,
      ]);
    }

    setOptions([]);
  }

  async function handleAutocomplete(value: string, client: ApolloClient<object>) {
    if (!value || value.length < 1) {
      setOptions([]);
    } else {
      const { data } = await client.query({
        query: SEARCH_FOR_USERS,
        variables: { query: value },
      });

      const res = data.users.filter((i: any) => !users.find(j => i.id === j.id))
      setOptions(res);
    }
  }

  function removeUser(index: number) {
    let newArr = [...users];
    newArr.splice(index, 1)
    setUsers(newArr);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    setMessage(e.target.value);
  }

  function onSubmit(e: FormEvent): void {
    e.preventDefault();
    // console.log("hello")

    makeRoom({ variables: {
      message,
      members: users.map(item => item.id),
    }});
  }
  
  return (
    <div className={classes.root}>
      <AddUsers options={options} addUser={addUserToRoom} handleAutoComplete={handleAutocomplete} />
      <UsersList users={users} remove={removeUser} />
      <MessageInput message={message} onChange={onChange} onSubmit={onSubmit} />
    </div>
  )
}