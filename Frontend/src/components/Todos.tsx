import dateFormat from 'dateformat'
import { History } from 'history'
// import update from 'immutability-helper'
import * as React from 'react'


import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,  
  Loader
} from 'semantic-ui-react'

import { createBlog, deleteBlog, getUserBlogs, patchBlog } from '../api/blogs-api'
import Auth from '../auth/Auth'
import { Blog } from '../types/Blog'
import { Link } from 'react-router-dom'

interface TodosProps {
  auth: Auth
  history: History
}

interface TodosState {
  todos: Blog[]
  editMode: Boolean
  selectedBlog: Blog | null
  newTodoName: string
  loadingTodos: boolean
}

export class Blogs extends React.PureComponent<TodosProps, TodosState> {
  state: TodosState = {
    todos: [],
    newTodoName: '',
    editMode: false,
    selectedBlog: null,   
    loadingTodos: true
  }
  
  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newTodoName: event.target.value })
  }

  // onEditButtonClick = (blog: Blog) => {

  //   this.setState({
  //     editMode: true,
  //     selectedBlog: blog,
  //   });
      
  //    // this.setState({ editMode: true, selectedBlog: blog });
  //     this.props.history.push(`/edit/${blog.postId}`,state: { blog })  
 
  // }

  // onTodoCreate = async (event: React.ChangeEvent<HTMLButtonElement>) => {
  //   try {
  //     const dueDate = this.calculateDueDate()
  //     await create(this.props.auth.getIdToken(), {
  //       name: this.state.newTodoName,
  //       dueDate
  //     })

  //     const todos = await getTodos(this.props.auth.getIdToken())      
  //     this.renderLoading()     
  
  //     this.setState({
  //       todos,
  //       loadingTodos: false
  //     })
  //     return this.renderTodos()

      
  //   } catch {
  //     alert('Todo creation failed')
  //   }
  // }

  onTodoDelete = async (todoId: string) => {
    try {
      await deleteBlog(this.props.auth.getIdToken(), todoId)

      const todos = await getUserBlogs(this.props.auth.getIdToken())      
      this.renderLoading()     
  
      this.setState({
        todos,
        loadingTodos: false
      })
      return this.renderTodos()
     
    } catch {
      const todos = await getUserBlogs(this.props.auth.getIdToken())      
      this.renderLoading()     
  
      this.setState({
        todos,
        loadingTodos: false
      })
      return this.renderTodos()
    }
  }

  onTodoCheck = async (pos: number) => {
    try {
      const todo = this.state.todos[pos]
      await patchBlog(this.props.auth.getIdToken(), todo.postId, {
        title: todo.title,
        body: todo.body,
        author: todo.author,
      })
      // this.setState({
      //   todos: update(this.state.todos, {
      //     [pos]: { done: { $set: !todo.done } }
      //   })
      // })
    } catch {
      alert('Todo deletion failed')
    }
  }

  async componentDidMount() {
    try {
      const todos = await getUserBlogs(this.props.auth.getIdToken())
      this.setState({
        todos,
        loadingTodos: false
      })
    } catch (e) {
      alert(`Failed to fetch todos: ${(e as Error).message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">My Blogs</Header>    

        {this.renderTodos()}
      </div>
    )
  }  

  renderTodos() {
    if (this.state.loadingTodos) {
      return this.renderLoading()
    }

    return this.renderTodosList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading TODOs
        </Loader>
      </Grid.Row>
    )
  }

  onEditButtonClick = (postId: string) => {
    this.props.history.push(`/blogImage/${postId}`)
  }


 

  renderTodosList() {   
    return (
      <Grid padded>
        {this.state.todos.map((blog, pos) => {
          return (
            <Grid.Row key={blog.postId}>  
             <Grid.Column width={3} floated="right">
              {blog.attachmentUrl && (
                <div className="image-container">                   
                  <img src={blog.attachmentUrl} alt='' className="small-image" />
                </div>
              )}
            </Grid.Column>       
                     
            <Grid.Column width={3} floated="right">
              {blog.title}
            </Grid.Column>
            <Grid.Column width={3} floated="right">
              {blog.body}
            </Grid.Column>
            <Grid.Column width={1} floated="right">
              <Button
                icon
                color="blue"
                onClick={() => this.onEditButtonClick(blog.postId)}
              >
                <Icon name="pencil" />
              </Button>
            </Grid.Column>
            <Grid.Column width={1} floated="right">
              <Button as={Link} to={{ pathname: `/edit/${blog.postId}`, state: { blog } }}
                icon
                color="blue"                 
              >
                <Icon name="edit" />
              </Button>
            </Grid.Column>
            <Grid.Column width={1} floated="right">
              <Button
                icon
                color="red"
                onClick={() => this.onTodoDelete(blog.postId)}
              >
                <Icon name="delete" />
              </Button>
            </Grid.Column>  
           
            <Grid.Column width={16}>
              <Divider />
            </Grid.Column>
          </Grid.Row>
          
          )
        })}
      </Grid>
    )
  }

  calculateDueDate(): string {
    const date = new Date()
    date.setDate(date.getDate() + 7)

    return dateFormat(date, 'yyyy-mm-dd') as string
  }
}

