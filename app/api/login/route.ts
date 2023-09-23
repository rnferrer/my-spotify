import { NextResponse } from "@/node_modules/next/server";

import type { NextApiRequest } from "@/node_modules/next/dist/shared/lib/utils";

const generateRandomStr = (length:number) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

export const GET = async (request: NextApiRequest) => {

  return NextResponse.redirect('http:/localhost:3000/dashboard')
}