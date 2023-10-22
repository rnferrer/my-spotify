import { NextResponse } from "@/node_modules/next/server";
import { getAuthURL } from "@/utils/spotifyAuth";

export const GET = async () => {
  const url = getAuthURL()
  return NextResponse.redirect(url)
}