import 'source-map-support/register'

import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { getBlogById } from '../../helpers/blogs'


export const handler: APIGatewayProxyHandler =  async (event): Promise<APIGatewayProxyResult> => {

    // TODO: Implement creating a new TODO item

    console.log('Get Item Processing Event ', event)
    

    const postId = event.pathParameters.postId    

    const item = await getBlogById(postId)
    
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        result: item
      })
    }

  }

