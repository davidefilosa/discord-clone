import { NextResponse } from "@/node_modules/next/server";
import { currentProfile } from "@/lib/current-profile";
import { prismadb } from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await prismadb.server.update({
      where: { id: params.serverId, profileId: profile.id },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("SERVER POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await prismadb.server.delete({
      where: { id: params.serverId, profileId: profile.id },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("SERVER POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
