import { NextResponse } from "@/node_modules/next/server";
import { currentProfile } from "@/lib/current-profile";
import { prismadb } from "@/lib/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    if (!params.channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    const server = await prismadb.server.update({
      where: { id: serverId, profileId: profile.id },
      data: {
        channels: {
          deleteMany: {
            id: params.channelId,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("SERVER POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { name, type } = await req.json();

    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    if (!params.channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    const server = await prismadb.server.update({
      where: { id: serverId, profileId: profile.id },
      data: {
        channels: {
          update: {
            where: { id: params.channelId },
            data: { name, type },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("SERVER POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
