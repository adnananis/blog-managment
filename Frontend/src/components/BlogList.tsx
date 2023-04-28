// import React from 'react';
// import { Link } from 'react-router-dom';  
// import {  getBlogs } from '../api/todos-api' 
// import { Blog } from '../types/Blog'

//   interface BlogsProps {    
//     history: History
//   }
  
//   interface BlogsState {
//     blogs: Blog[]  
//     loadingTodos: boolean
//   }

//   export class BlogList extends React.PureComponent<BlogsProps, BlogsState> {
//     state: BlogsState = {
//       blogs: [],    
//       loadingTodos: true
//     }
      
//         async componentDidMount() {
//           try {
//             const blogs = await getBlogs()
//             this.setState({
//               blogs,
//               loadingTodos: false
//             })
//           } catch (e) {
//             alert(`Failed to fetch todos: ${(e as Error).message}`)
//           }
//         }
      
//         render(): React.ReactNode {
            
//             return (
//                 <div>
//                   <h2>Blog List</h2>
//                   <ul>
//                     {this.state.blogs.map((blog) => (
//                       <li key={blog.postId}>
//                         <Link to={`/blogs/${blog.postId}`}>
//                           <h3>{blog.title}</h3>
//                         </Link>
//                         <p>{blog.body}</p>
//                         <p>By {blog.author}</p>
//                         <hr />
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               );
//             };


//         }
        //////////
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Grid, Card, Image } from 'semantic-ui-react';
// import { getBlogs } from '../api/blogs-api';
// import { Blog } from '../types/Blog';

// interface BlogsProps {
//   history: History;
// }

// interface BlogsState {
//   blogs: Blog[];
//   loadingTodos: boolean;
// }

// export class BlogList extends React.PureComponent<BlogsProps, BlogsState> {
//   state: BlogsState = {
//     blogs: [],
//     loadingTodos: true,
//   };

//   async componentDidMount() {
//     try {
     
//       const blogs = await getBlogs();
//       this.setState({
//         blogs: this.convertDates(blogs),
//         loadingTodos: false,
//       });
//     } catch (e) {
//       alert(`Failed to fetch blogs: ${(e as Error).message}`);
//     }
//   }

//   convertDates(blogs: Blog[]): Blog[] {
//     return blogs.map((blog) => ({
//       ...blog,
//       createdAt: new Date(parseInt(blog.createdAt.toString()))    
//     }));
//   }
//   renderBlogs() {
//     return (
//       <Grid columns={1}>
//         {this.state.blogs.map((blog) => (
//           <Grid.Column key={blog.postId}>
//             <Card fluid>
//               {/* {blog.imageUrl && <Image src={blog.imageUrl} wrapped ui={false} />} */}
//               <Card.Content>
//                 <Link to={{ pathname: `/blog/${blog.postId}`, state: { blog } }} >
//                   <Card.Header>{blog.title}</Card.Header>
//                 </Link>
//                 <Card.Meta>By {blog.author}</Card.Meta>
//                 <Card.Description>{blog.body}</Card.Description>
//                 <Card.Meta>
//                   Created at: {blog.createdAt.toLocaleString()}
//                 </Card.Meta>                
//               </Card.Content>
//             </Card>
//           </Grid.Column>
//         ))}
//       </Grid>
//     );
//   }

//   render(): React.ReactNode {
//     return (
//       <div>
//         <h2>Blog List</h2>
//         {!this.state.loadingTodos ? (
//           this.renderBlogs()
//         ) : (
//           <div>Loading...</div>
//         )}
//       </div>
//     );
//   }
// }
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Image, Modal, Button } from 'semantic-ui-react';
import { getBlogs } from '../api/blogs-api';
import { Blog } from '../types/Blog';

interface BlogsProps {
  history: History;
}

interface BlogsState {
  blogs: Blog[];
  loadingBlogs: boolean;
  selectedBlog: Blog | null;
  modalOpen: boolean;
}

export class BlogList extends React.PureComponent<BlogsProps, BlogsState> {
  state: BlogsState = {
    blogs: [],
    loadingBlogs: true,
    selectedBlog: null,
    modalOpen: false,
  };

  async componentDidMount() {
    try {
      const blogs = await getBlogs();
      this.setState({
        blogs: this.convertDates(blogs),
        loadingBlogs: false,
      });
    } catch (e) {
      alert(`Failed to fetch blogs: ${(e as Error).message}`);
    }
  }

  convertDates(blogs: Blog[]): Blog[] {
    return blogs.map((blog) => ({
      ...blog,
      createdAt: new Date(parseInt(blog.createdAt.toString())),
    }));
  }

  handleOpenModal = (blog: Blog) => {
    this.setState({
      selectedBlog: blog,
      modalOpen: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      selectedBlog: null,
      modalOpen: false,
    });
  };

  renderBlogs() {
    return (
      <Grid columns={1}>
        {this.state.blogs.map((blog) => (
          <Grid.Column key={blog.postId}>
            <Card fluid >
            {blog.attachmentUrl && (
                  <Image
                    src={blog.attachmentUrl}
                    wrapped                    
                    size="small"

                  />
                )}
              <Card.Content>
                <Link to={{ pathname: `/blog/${blog.postId}`, state: { blog } }}>
                  <Card.Header>{blog.title}</Card.Header>
                </Link>
                <Card.Meta>By {blog.author}</Card.Meta>
                <Card.Description>{blog.body}</Card.Description>
                <Card.Meta>
                  Created at: {blog.createdAt.toLocaleString()}
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Button onClick={() => this.handleOpenModal(blog)}>
                  View Details
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
        {this.state.selectedBlog && (
          <Modal open={this.state.modalOpen} onClose={this.handleCloseModal}>
          <Modal.Header>{this.state.selectedBlog.title}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
            <Image
                    src={this.state.selectedBlog.attachmentUrl}
                    wrapped
                    size="medium"                    
                  />
              <p>{this.state.selectedBlog.body}</p>
              <p>By {this.state.selectedBlog.author}</p>
              <p>Created at: {this.state.selectedBlog.createdAt.toLocaleString()}</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleCloseModal}>Close</Button>
          </Modal.Actions>
        </Modal>
        )}
      </Grid>
    );
  }

  render(): React.ReactNode {
    return (
      <div>
        <h2>Blog List</h2>
        {!this.state.loadingBlogs ? (
          this.renderBlogs()
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
