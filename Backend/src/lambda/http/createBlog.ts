import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { CreateBlogRequest } from '../../requests/CreateBlogRequest'
import { createBlog } from '../../helpers/blogs'


const logger = createLogger('Create Todo')

 export const handler: APIGatewayProxyHandler =  async (event): Promise<APIGatewayProxyResult> => {
    //const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item

    logger.info('Create Handler Processing Event ', event)
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]

    const newTodo: CreateBlogRequest = JSON.parse(event.body)
       
    await createBlog(newTodo, jwtToken) 

       
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        newItem: newTodo
      })
    }
  }   

