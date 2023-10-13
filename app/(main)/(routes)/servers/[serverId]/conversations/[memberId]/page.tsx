import { currentProfile } from "@/lib/current-profile";
import { prismadb } from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { RedirectToSignIn } from "@clerk/nextjs";
import { getOrCreateConversation } from "@/lib/conversation";
import ChatHeader from "@/components/chat/chat-header";

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
  searchParams: {
    video?: boolean;
  };
}

const MemberIdPage = async ({ params, searchParams }: MemberIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return <RedirectToSignIn />;
  }

  const currentMember = await prismadb.member.findFirst({
    where: { serverId: params.serverId, profileId: profile.id },
    include: { profile: true },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={otherMember.name}
        type="conversation"
        serverId={params.serverId}
        imageUrl={otherMember.profile.imageUrl}
      />
    </div>
  );
};

export default MemberIdPage;
