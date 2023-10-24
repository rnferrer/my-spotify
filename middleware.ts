import { NextResponse } from 'next/server'
import { getToken }  from './utils/auth'
import type { NextRequest } from 'next/server'

type NextRequestWithLocals = NextRequest & {
  locals: string | null
}
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequestWithLocals) {
  const user: string | undefined = request.cookies?.get('userID')?.value || '';
  console.log(user)
  if (user){

    // const token = await getToken(user)
    // console.log(token)
    // request.locals = token
    return NextResponse.next()
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/spotify/:path*',
}