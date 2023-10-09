import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn;
  }

  const profile = await prismadb.profile.findUnique({
    where: { userId: user.id },
  });

  if (profile) {
    return profile;
  }

  const newprofile = await prisma.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newprofile;
};
