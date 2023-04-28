// import React from 'react';
// import { History } from 'history';
// import Auth from '../auth/Auth';
// import { Blog } from '../types/Blog';
// import { patchBlog } from '../api/todos-api';
// import { Button, Form, Input, TextArea } from 'semantic-ui-react';
// import { useLocation } from 'react-router-dom';

// interface EditBlogProps {
//   blog?: Blog 
//   auth: Auth;
//   history: History;
  
// }

// interface EditBlogState {
//   title: string;
//   body: string;
//   author: string;
// }

// export class EditBlog extends React.PureComponent<EditBlogProps, EditBlogState> {
//   state: EditBlogState = {
    
    

//     title: this.props.blog!.title,
//     body: this.props.blog!.body,
//     author: this.props.blog!.author,
//   };



//   handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value,
//     } as Pick<EditBlogState, keyof EditBlogState>);
//   };

//   handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault(); 
   

//     const { title, body, author } = this.state;
//     const { postId } = this.props.blog!;

//     try {
//       await patchBlog(this.props.auth.getIdToken(), postId, {
//         title: title,
//         body: body,
//         author: author,
//       });
//     } catch {
//       alert('Blog update failed');
//     }

//     this.props.history.push('/'); // Navigate to the blogs list page after updating the blog post
//   };

//   render() {
//     const { title, body, author } = this.state;

//     return (
//       <div>
//         <h2>Edit Blog Post</h2>
//         <Form onSubmit={this.handleSubmit}>
//           <Form.Field>
//             <label>Title:</label>
//             <Input type="text" name="title" value={title} onChange={this.handleInputChange} required />
//           </Form.Field>
//           <Form.Field>
//             <label>Content:</label>
//             <TextArea name="body" value={body} onChange={this.handleInputChange} required />
//           </Form.Field>
//           <Form.Field>
//             <label>Author:</label>
//             <Input type="text" name="author" value={author} onChange={this.handleInputChange} required />
//           </Form.Field>
//           <Button type="submit">Save Changes</Button>
//         </Form>
//       </div>
//     );
//   }
// }
import React from 'react';
import { History,LocationState, Location } from 'history';
import Auth from '../auth/Auth';
import { Blog } from '../types/Blog';
import { patchBlog } from '../api/blogs-api';
import { Button, Form, Input, TextArea } from 'semantic-ui-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface EditBlogProps extends RouteComponentProps {
  auth: Auth;
  blog?: Blog;
  history: History<LocationState>;
}

interface EditBlogState {
  title: string;
  body: string;
  author: string;
  postId: string;
}

export class EditBlog extends React.Component<EditBlogProps, EditBlogState> {
  state: EditBlogState = {
    title: '',
    body: '',
    author: '',
    postId: ''
  };

  componentDidMount() {
    const { history } = this.props;
    //const blog = this.props.history?.location?.state?.blog;
    //console.log(history?.location?.state)
    //const blog = history?.location?.state?.blog as Blog | undefined;

    const blog = (history?.location?.state as { blog?: Blog })?.blog;

    //const { location } = this.props;
    //const blog = location.state?.blog as Blog | ;
    //const { blog } = this.props;
    console.log(this.props)
    if (blog) {
      const { title, body, author , postId } = blog;
      console.log(blog)
      this.setState({ title, body, author, postId });
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    } as Pick<EditBlogState, keyof EditBlogState>);
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, body, author, postId } = this.state;
    const { auth, history } = this.props;    
    
      try {
        await patchBlog(auth.getIdToken(), postId, {
          title: title,
          body: body,
          author: author,
        });
      } catch {
        alert('Blog update failed');
      }

      history.push('/'); // Navigate to the blogs list page after updating the blog post
    
  };

  render() {
    const { title, body, author } = this.state;
    console.log(this.state)
    return (
      <div>
        <h2>Edit Blog Post</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Title:</label>
            <Input type="text" name="title" value={title} onChange={this.handleInputChange} required />
          </Form.Field>
          <Form.Field>
            <label>Content:</label>
            <TextArea name="body" value={body} onChange={this.handleInputChange} required />
          </Form.Field>
          <Form.Field>
            <label>Author:</label>
            <Input type="text" name="author" value={author} onChange={this.handleInputChange} required />
          </Form.Field>
          <Button type="submit">Save Changes</Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(EditBlog);
