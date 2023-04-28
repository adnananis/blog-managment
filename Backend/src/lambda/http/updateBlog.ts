import 'source-map-support/register'

import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'


import { updateBlog } from '../../helpers/blogs'
import { UpdateBlogRequest } from '../../requests/UpdateBlogRequest'


export const handler: APIGatewayProxyHandler =  async (event): Promise<APIGatewayProxyResult> => {

    // TODO: Implement creating a new TODO item

    console.log('Update Item Processing Event ', event)
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]

    const postId = event.pathParameters.postId
    const updatedBlog: UpdateBlogRequest = JSON.parse(event.body)

    const updatedItem = await updateBlog(updatedBlog, postId, jwtToken)

    
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        result: updatedItem
      })
    }

  }

