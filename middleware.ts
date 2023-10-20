import { NextResponse } from 'next/server'
import { getToken }  from './utils/auth'
import type { NextRequest } from 'next/server'
import connectDB from './db/db'

type NextRequestWithLocals = NextRequest & {
  locals: string
}
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequestWithLocals) {
  const user: string | undefined = request.cookies?.get('userID')?.value || '';
  console.log(user)
  if (user){
    await connectDB();

    const token = await getToken(user)
    console.log(token)
    request.locals = token
    return NextResponse.next()
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/spotify/:path*',
}