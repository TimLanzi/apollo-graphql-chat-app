import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Chatroom from "../components/home/Chatroom";
import MainLayout from "../components/home/layout";
import { SESSION } from "../graphql/auth";

interface Params {
  id: string;
}

export default function RoomPage() {
  let params = useParams<Params>();
  let history = useHistory();
  
  const { data: session } = useQuery(SESSION);

  useEffect(() => {
    if (!params.id && !session.user.loading) {
      if (session.user.data.chatrooms.length <= 0) {
        history.push("/new");
      } else {
        history.push(`/${session.user.data.chatrooms[0].id}`)
      }
    }
  }, [params, session]);

  return (
    <MainLayout>
      <Chatroom id={params.id} />
    </MainLayout>
  )
}