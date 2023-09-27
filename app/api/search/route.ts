import { NextApiRequest } from "@/node_modules/next/dist/shared/lib/utils"
import { NextRequest, NextResponse } from "@/node_modules/next/server"

export const GET = async (request: NextApiRequest) => {

  if(request.url){
    const queryParams = new URLSearchParams(request.url.split('?')[1]);
    const searchQuery = queryParams.get('queryString')
    console.log(searchQuery)
  }
}