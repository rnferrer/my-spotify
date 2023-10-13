import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { NextApiRequest } from 'next'
import { getToken } from './utils/auth'

type NextApiRequestWithLocals = NextApiRequest & {
  locals: string
}
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextApiRequestWithLocals) {
  console.log('in middleware!')
  const user = request.cookies.get('userID')
  if (user){

    const token = getToken(user)
    console.log(token)
    request.locals = token
    return NextResponse.next()
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/spotify/:path*',
}