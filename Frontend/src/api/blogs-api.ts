import { apiEndpoint } from '../config'
import { Blog } from '../types/Blog';
import { CreateBlogRequest } from '../types/CreateBlogRequest';
import Axios from 'axios'
import { UpdateBlogRequest } from '../types/UpdateBlogRequest';


export async function getBlogs(): Promise<Blog[]> {
  console.log('Fetching Blogs')

  const response = await Axios.get(`${apiEndpoint}/blogs`, {
    headers: {
      'Content-Type': 'application/json',      
    },
  })
  console.log('Blogs:', response.data)
  return response.data.items
}

export async function getUserBlogs(idToken: string): Promise<Blog[]> {
  console.log('Fetching blogs')

  const response = await Axios.get(`${apiEndpoint}/userBlogs`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Todos:', response.data)
  return response.data.items
}

export async function createBlog(
  idToken: string,
  newBlog: CreateBlogRequest
): Promise<Blog> {
  const response = await Axios.post(`${apiEndpoint}/blog`,  JSON.stringify(newBlog), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function getBlogById(  
  postId: string  
): Promise<Blog> {
  const response = await Axios.get(`${apiEndpoint}/blog/${postId}`, {
    headers: {
      'Content-Type': 'application/json'      
    }
  })
  console.log('Todos:', response.data)
  return response.data
}

export async function patchBlog(
  idToken: string,
  postId: string,
  updatedTodo: UpdateBlogRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/blog/${postId}`, JSON.stringify(updatedTodo), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteBlog(
  idToken: string,
  postId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/blog/${postId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  postId: string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/blog/${postId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}
