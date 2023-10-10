"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "../modals/create-server-madal";
import EditServerModal from "../modals/edit-server-modal";
import InviteModal from "../modals/invite-modal";

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
    </>
  );
};

export default ModalProvider;
