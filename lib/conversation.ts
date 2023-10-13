import { prismadb } from "./prismadb";

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  let conversation =
    (await findConversation(memberOneId, memberTwoId)) ||
    (await findConversation(memberTwoId, memberOneId));

  if (!conversation) {
    conversation = await createNewConversation(memberOneId, memberTwoId);
  }

  return conversation;
};

const findConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    const conversation = await prismadb.conversation.findFirst({
      where: {
        AND: [{ memberOneId: memberOneId }, { memberTwoId: memberTwoId }],
      },
      include: {
        memberOne: { include: { profile: true } },
        memberTwo: { include: { profile: true } },
      },
    });

    return conversation;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createNewConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  try {
    const conversation = await prismadb.conversation.create({
      data: { memberOneId, memberTwoId },
      include: {
        memberOne: { include: { profile: true } },
        memberTwo: { include: { profile: true } },
      },
    });
    return conversation;
  } catch (error) {
    console.log(error);
    return null;
  }
};
