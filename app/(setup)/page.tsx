import { initialProfile } from "@/lib/initial-profile";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const profile = await initialProfile();
  const server = await prismadb.server.findFirst({
    where: { members: { some: { profileId: profile.id } } },
  });

  if (server) {
    return redirect(`servers/${server.id}`);
  }

  return <div>Create a server</div>;
};

export default SetupPage;
