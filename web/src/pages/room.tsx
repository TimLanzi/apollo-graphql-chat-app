import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Chatroom from "../components/messaging/Chatroom";
import MainLayout from "../components/messaging/layout";
import { SESSION } from "../graphql/auth";

interface Params {
  id: string;
}

export default function RoomPage() {
  let params = useParams<Params>();
  let history = useHistory();
  
  const { data: session } = useQuery(SESSION);

  useEffect(() => {
    if (!params.id) {
      if (!localStorage.getItem("token")) {
        history.replace("/login");
      }

      if (!session.user.loading) {
        if (!session.user.data || session.user.data?.chatrooms.length <= 0) {
          history.replace("/new");
        } else {
          history.replace(`/room/${session.user.data?.chatrooms[0].id || ""}`)
        }
      }
    }
  }, [params, session]);

  return (
    <MainLayout>
      <Chatroom id={params.id} />
    </MainLayout>
  )
}