"use client";

import { useEffect, useState } from "react";
import CreateChannelModal from "../modals/create-channel-modal";
import CreateServerModal from "../modals/create-server-madal";
import DeleteServerModal from "../modals/delete-server-modal";
import EditServerModal from "../modals/edit-server-modal";
import InviteModal from "../modals/invite-modal";
import LeaveServerModal from "../modals/leave-server-modal";
import MembersModal from "../modals/member-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <DeleteServerModal />
      <LeaveServerModal />
    </>
  );
};

export default ModalProvider;
