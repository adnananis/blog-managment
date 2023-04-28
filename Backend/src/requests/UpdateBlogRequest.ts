/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateBlogRequest {
  title: string
  body: string 
  author: string
  updatedAt: string
}