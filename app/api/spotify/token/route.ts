import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest): Promise<NextResponse> => {

  if(request.url){
    const token: string = request.cookies?.get('access_token')?.value || '';

    if(token !== '') {
      return NextResponse.json({token})
    }
  }

  return NextResponse.json({message: 'Error getting token!'})
}