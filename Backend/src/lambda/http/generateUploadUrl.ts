import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { generateUploadUrl } from '../../helpers/blogs'

const logger = createLogger('Create Blog')


    export const handler =  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
   
    logger.info('Upload Image Handler Processing Event ', event)

    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]
    const postId = event.pathParameters.postId

    const URL = await generateUploadUrl(postId,jwtToken)

    
   
            return {
                statusCode: 201,
                headers: {
                  'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                  newItem: postId,
                  uploadUrl: URL
                })
              }
    
  }

