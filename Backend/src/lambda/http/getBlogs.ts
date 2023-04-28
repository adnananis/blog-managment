import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { createLogger } from '../../utils/logger'
import {getAllBlogs } from '../../helpers/blogs'


const logger = createLogger('getBlogs')

// TODO: Get all TODO items for a current user
export const handler: APIGatewayProxyHandler =  async (event): Promise<APIGatewayProxyResult> => {
    // Write your code here
   // createLogger('Get Todo Processing Event ' + event)
   logger.info('Processing Event ', event)    

    const items = await getAllBlogs()
  
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


