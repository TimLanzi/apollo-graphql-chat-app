import React from "react";
import { useHistory } from "react-router-dom";
import MainLayout from "../components/messaging/layout";
import MakeNewRoom from "../components/messaging/MakeNewRoom";

export default function NewRoomPage() {
  let history = useHistory();

  function setToCreatedRoom(id: string) {
    history.push(`/room/${id}`);
  }

  return (
    <MainLayout>
      <MakeNewRoom setRoom={setToCreatedRoom} />
    </MainLayout>
  )
}