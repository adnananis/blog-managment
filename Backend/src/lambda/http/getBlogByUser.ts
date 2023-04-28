import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { createLogger } from '../../utils/logger'
import { getAllBlog } from '../../helpers/blogs'


const logger = createLogger('getBlogByUser')

// TODO: Get all TODO items for a current user
export const handler: APIGatewayProxyHandler =  async (event): Promise<APIGatewayProxyResult> => {
    // Write your code here
   // createLogger('Get Todo Processing Event ' + event)
   logger.info('Processing Event ', event)    

   const authorization = event.headers.Authorization
   const split = authorization.split(' ')
   const jwtToken = split[1]

    const items = await getAllBlog(jwtToken)
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',       
      },
      body: JSON.stringify({
        items
      })
    }
    
  }


