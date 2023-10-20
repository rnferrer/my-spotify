import { NextResponse } from "@/node_modules/next/server";
import { getAuthURL } from "@/utils/spotifyAuth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const GET = async () => {
  const users = await prisma.user.findMany()
  console.log(users)
  // const url = getAuthURL()
  // return NextResponse.redirect(url)
}