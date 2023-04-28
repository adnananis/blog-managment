import React, { Component } from 'react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { Grid, Menu, Segment } from 'semantic-ui-react'

import Auth from './auth/Auth'
import { NotFound } from './components/NotFound'
import { Blogs } from './components/Todos'
import { BlogList } from './components/BlogList'
import { AddBlog } from './components/AddBlog'
import { EditBlog } from './components/EditBlog'
import { DetailBlog } from './components/DetailBlog'
import { EditTodo } from './components/EditTodo'

export interface AppProps {}

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState {}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin() {
    this.props.auth.login()
  }

  handleLogout() {
    this.props.auth.logout()
  }

  render() {
    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={16}>
                <Router history={this.props.history}>
                  {this.generateMenu()}

                  {this.generateCurrentPage()}
                </Router>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }

  generateMenu() {

    if (this.props.auth.isAuthenticated()) {
      return (
        <Menu>
        <Menu.Item name="home">
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Item name="MyBlogs">
          <Link to="/MyBlog">My Blogs</Link>
        </Menu.Item>

        <Menu.Item name="Add">
          <Link to="/add">Add Blog</Link>
        </Menu.Item>

        <Menu.Menu position="right">{this.logInLogOutButton()}</Menu.Menu>
      </Menu>
      )
    }
    else
    return (
      <Menu>
        <Menu.Item name="home">
          <Link to="/">Home</Link>
        </Menu.Item>       

        <Menu.Menu position="right">{this.logInLogOutButton()}</Menu.Menu>
      </Menu>
    )
  }

  logInLogOutButton() {
    if (this.props.auth.isAuthenticated()) {
      return (
        <Menu.Item name="logout" onClick={this.handleLogout}>
          Log Out
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item name="login" onClick={this.handleLogin}>
          Log In
        </Menu.Item>
      )
    }
  }

  generateCurrentPage() {
    if (!this.props.auth.isAuthenticated()) {      
      return (
      <Switch>

        <Route         
        path="/" 
        render={props => {
          console.log(props)           
          return <BlogList history={this.props.history}   />
        }}
        />
        
         <Route 
        
        path="/blog/:postId" 
        render={props => {
          console.log(props)           
          return <DetailBlog {...props} />
        }}
       // component={DetailBlog} 
        
        />
      </Switch>
      )
     // return <BlogList history={this.props.history} />
    }
   else
    return (
      <Switch>
         <Route
          path="/"
          exact
          render={props => {
            return <BlogList history={this.props.history}   />
          }}
        />
        <Route
          path="/MyBlog"
          exact
          render={props => {
            return <Blogs {...props} auth={this.props.auth} />
          }}
        />
        <Route
          path="/add"
          exact
          render={props => {
            return <AddBlog {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/edit/:postId"
          exact
          render={props => {
            console.log(props)           
            return <EditBlog {...props} auth={this.props.auth} />
          }}
        />
        <Route 
        
          path="/blog/:postId" 
          render={props => {
            console.log(props)           
            return <DetailBlog {...props}  />
          }}
         // component={DetailBlog} 
          
          />

        <Route
          path="/blogImage/:postId"
          exact
          render={props => {
            return <EditTodo {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/blogImage/:postId"
          exact
          render={props => {
             return <EditTodo {...props} auth={this.props.auth} />
          }}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
