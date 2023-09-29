import { NextApiRequest, NextApiResponse } from "@/node_modules/next/dist/shared/lib/utils"
import { NextRequest, NextResponse } from "@/node_modules/next/server"

export const GET = async (request: NextApiRequest, response:NextApiResponse) => {

  if(request.url){
    const queryParams = new URLSearchParams(request.url.split('?')[1]);
    const searchQuery = queryParams.get('searchQuery')
    console.log(searchQuery)
    return NextResponse.json({data: searchQuery})  
  }
}