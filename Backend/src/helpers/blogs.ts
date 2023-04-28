import { BlogAccess } from './BlogAccess'
import { BlogItem } from '../models/BlogItem'
import { CreateBlogRequest } from '../requests/CreateBlogRequest'
import { UpdateBlogRequest } from '../requests/UpdateBlogRequest'
import { parseUserId } from '../auth/utils'
import { BlogUpdate } from '../models/BlogUpdate'
import { AttachmentUtils } from './attachmentUtils'


const uuidv4 = require('uuid/v4')
const toDoAccess = new BlogAccess()
const attachmentUtils = new AttachmentUtils()

//const s3_BucketName = process.env.ATTACHMENT_S3_BUCKET

export async function getAllBlogs (): Promise<BlogItem[]> {  
  return toDoAccess.getAllBlogs()
}

export async function getAllBlog (jwtToken: string): Promise<BlogItem[]> {
    const userId = parseUserId(jwtToken)
    return toDoAccess.getAllBlog(userId)
  }
  
  export async function createBlog (
    createTodoRequest: CreateBlogRequest,
    jwtToken: string
  ): Promise<BlogItem> {
    const userId = parseUserId(jwtToken)
    const id = uuidv4()
    return toDoAccess.createBlog({
      userId: userId,
      postId: id,
      createdAt: new Date().getTime().toString(),
      ...createTodoRequest,   
      updatedAt: '',
      attachmentUrl:''
    })
  }
  
  export async function updateBlog (
    updateBlogRequest: UpdateBlogRequest,
    postId: string,
    jwtToken: string
  ): Promise<BlogUpdate> {
    const userId = parseUserId(jwtToken)
    updateBlogRequest.updatedAt = new Date().getTime().toString()
    return toDoAccess.updateBlog(updateBlogRequest, postId, userId)
  }

  export async function getBlogById (   
    postId: string   
  ): Promise<BlogItem> {    
    return toDoAccess.getBlogById(postId)
  }
  
  export async function deleteBlog (postId: string, jwtToken: string): Promise<string> {
    const userId = parseUserId(jwtToken)
    return toDoAccess.deleteBlog(postId, userId)
  }
  
  export async function generateUploadUrl (postId: string, jwtToken: string): Promise<string> {
    const url = await attachmentUtils.generateUploadUrl(postId)
    const userId = parseUserId(jwtToken)
    console.log("attachment URL after upload " + url)
    await toDoAccess.updateBlogAttachment(postId,userId)
    return url;
  }
  
