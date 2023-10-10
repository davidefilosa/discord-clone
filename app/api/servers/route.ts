import { NextResponse } from "@/node_modules/next/server";
import { currentProfile } from "@/lib/current-profile";
import { prismadb } from "@/lib/prismadb";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await prismadb.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: { create: [{ name: "general", profileId: profile.id }] },
        members: {
          create: [{ role: MemberRole.ADMIN, profileId: profile.id }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("SERVER POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
