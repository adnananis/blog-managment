import * as AWS from 'aws-sdk'
import { BlogItem } from '../models/BlogItem'
import { BlogUpdate } from '../models/BlogUpdate'




export class BlogAccess {
  constructor (   
    private readonly documentClient =  new AWS.DynamoDB.DocumentClient(),   
    private readonly blogsTable = process.env.BLOG_TABLE,  
    private readonly s3_BucketName = process.env.ATTACHMENT_S3_BUCKET 
  ) {}

  async getAllBlogs (): Promise<BlogItem[]> {
    console.log('Getting all Blogs')      

    const params = {
      TableName: this.blogsTable     
    }

    const data = await this.documentClient.scan(params).promise();
   
    console.log(data)
    const items = data.Items

    return items as BlogItem[]
  }



  async getAllBlog (userId: string): Promise<BlogItem[]> {
    console.log('Getting all blog')
    console.log('Getting all blog By user ID' +  userId)
    console.log('Getting all blog By user ID Table' +  this.blogsTable)

    const params = {
      TableName: this.blogsTable
      ,
      KeyConditionExpression: '#userId = :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId'
      },
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }   

    const result = await this.documentClient.query(params).promise()
    
    const items = result.Items

    return items as BlogItem[]
  }

  async createBlog (blogItem: BlogItem): Promise<BlogItem> {
    console.log('Creating new blog')

    const params = {
      TableName: this.blogsTable,
      Item: blogItem
    }

    await this.documentClient.put(params).promise()    

    return blogItem as BlogItem
  }

  async updateBlog (
    blogUpdate: BlogUpdate,
    postId: string,
    userId: string
  ): Promise<BlogUpdate> {

    console.log('Updating Blog')

    const params = {
      TableName: this.blogsTable,
      Key: {
        userId: userId,
        postId: postId
      },
      UpdateExpression: 'set #a = :a, #b = :b, #c = :c,#d = :d',
      ExpressionAttributeNames: {
        '#a': 'title',
        '#b': 'body',
        '#c': 'author',
        '#d': 'updatedAt'
      },
      ExpressionAttributeValues: {
        ':a': blogUpdate['title'],
        ':b': blogUpdate['body'],
        ':c': blogUpdate['author'],
        ':d': blogUpdate['updatedAt']
      },
      ReturnValues: 'ALL_NEW'
    }

    const result = await this.documentClient.update(params).promise()
    console.log(result)
    const attributes = result.Attributes

    return attributes as BlogUpdate
  }


  async updateBlogAttachment (    
    postId: string,
    userId: string
  ): Promise<void> {

    console.log('Updating Blog')

    const params = {
      TableName: this.blogsTable,
      Key: {
        userId: userId,
        postId: postId
      },
      UpdateExpression: 'set #a = :a',
      ExpressionAttributeNames: {
        '#a': 'attachmentUrl'        
      },
      ExpressionAttributeValues: {
        ':a': `https://${this.s3_BucketName}.s3.amazonaws.com/${postId}`       
      },
      ReturnValues: 'ALL_NEW'
    }

    const result = await this.documentClient.update(params).promise()
    console.log(result)
    //const attributes = result.Attributes

   // return attributes as BlogUpdate
  }


 async getBlogById (   
        postId: string    
       ): Promise<BlogItem> {
  const params = {
    TableName: this.blogsTable,
    IndexName: 'PostIdIndex', // Name of the global secondary index
    KeyConditionExpression: 'postId = :postId',
    ExpressionAttributeValues: {
      ':postId': postId,
    },
  };

  try {
    const result = await this.documentClient.query(params).promise();

    return result.Items as unknown as BlogItem
    
  } catch (error) {
    console.error('Error retrieving blog:', error);
    throw error;
  }
}; 


  async deleteBlog (postId: string, userId: string): Promise<string> {
    console.log('Deleting blog')

    const params = {
      TableName: this.blogsTable,
      Key: {
        userId: userId,
        postId: postId
      }
    }

    const result = await this.documentClient.delete(params).promise()
    console.log(result)

    return '' as string
  }

  
}
