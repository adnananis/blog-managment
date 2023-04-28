import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'



import { createLogger } from '../../utils/logger'
import { deleteBlog } from '../../helpers/blogs'


const logger = createLogger('deleteBlog')

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    logger.info('Processing Event ', event)
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]

    const postId = event.pathParameters.postId

    const deleteData = await deleteBlog(postId, jwtToken)

    return {
      statusCode: 200,
      body: deleteData
    }
}



