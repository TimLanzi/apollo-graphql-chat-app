import React from "react";
import { useHistory } from "react-router-dom";
import MainLayout from "../components/home/layout";
import MakeNewRoom from "../components/home/MakeNewRoom";

export default function NewRoomPage() {
  let history = useHistory();

  function setToCreatedRoom(id: string) {
    // setNewRoom(false);
    // setSelectedRoom(id);
    history.push(`/room/${id}`);
  }

  return (
    <MainLayout>
      <MakeNewRoom setRoom={setToCreatedRoom} />
    </MainLayout>
  )
}