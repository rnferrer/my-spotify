import { NextResponse } from "@/node_modules/next/server";
import { getAuthURL } from "@/utils/spotifyAuth";

export const GET = async () => {
  const url = getAuthURL()
  console.log('IN LOGIN ROUTE')
  return NextResponse.redirect(url)
}