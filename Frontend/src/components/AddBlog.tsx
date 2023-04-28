import React from 'react';
import { History } from 'history';
import Auth from '../auth/Auth'
import { createBlog } from '../api/blogs-api';
import { Button, Form, Input, TextArea } from 'semantic-ui-react';

interface AddBlogProps {
  auth: Auth
  history: History;
}

interface AddBlogState {
  title: string;
  body: string;
  author: string;
}

export class AddBlog extends React.PureComponent<AddBlogProps, AddBlogState> {
  state: AddBlogState = {
    title: '',
    body: '',
    author: '',
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    } as Pick<AddBlogState, keyof AddBlogState>);
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, body, author } = this.state;

    try {        
        await createBlog(this.props.auth.getIdToken(), {
          title: title,
          body: body,
          author: author
        })  

      } catch {
        alert('Todo creation failed')
      }

    // TODO: Call API to create new blog post

    this.setState({
      title: '',
      body: '',
      author: '',
    });

    this.props.history.push('/'); // Navigate to the blogs list page after adding a new blog post
  };

  render() {
    const { title, body, author } = this.state;

    return (
        <div>
        <h2>Add New Blog Post</h2>
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
          <Button type="submit">Add Post</Button>
        </Form>
      </div>
    );
  }
}

