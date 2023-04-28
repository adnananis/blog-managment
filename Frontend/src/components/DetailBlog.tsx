import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { getBlogById } from '../api/blogs-api';
import { Blog } from '../types/Blog';
import { Card } from 'semantic-ui-react';

interface DetailBlogProps extends RouteComponentProps<{ postId: string }> {
  // Add any additional props or dependencies you may need
}

interface DetailBlogState {
  blog: Blog | null;
  loading: boolean;
}

export class DetailBlog extends React.Component<DetailBlogProps, DetailBlogState> {

  
  state: DetailBlogState = {
    blog: null,
    loading: true
  };

  componentDidMount() {
    console.log(this.props)
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
     // this.setState({ title, body, author, postId });
    }
  }

  // async componentDidMount() {
  //   console.log("Blog Details")
  //   const { postId } = this.props.match.params;
  //   try {
  //     const blog = await getBlogById(postId);
  //     this.setState({
  //       blog,
  //       loading: false
  //     });
  //   } catch (error) {
  //     console.error('Failed to fetch blog:', error);
  //   }
  // }

  render() {
    const { blog, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!blog) {
      return <div>Blog not found.</div>;
    }

    return (
      <Card>
        <Card.Content>
          <Card.Header>{blog.title}</Card.Header>
          <Card.Meta>By {blog.author}</Card.Meta>
          <Card.Description>{blog.body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div>Created At: {blog.createdAt.toLocaleString()}</div>
          <div>Updated At: {blog.updatedAt.toLocaleString()}</div>
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(DetailBlog);
