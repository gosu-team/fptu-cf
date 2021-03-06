import React, { Component } from "react";

import { Layout, Button, Icon, BackTop, Tag, Skeleton } from "antd";
import { Link } from "react-router-dom";
import Helmet from "react-helmet-async";
import styled from "styled-components";
import NotFound from "../not-found/NotFound";
import DisqusComponent from "../../utils/shared/disqus/DisqusComponent";

const { Content } = Layout;

const PostBody = styled.div`
  width: 740px;
  margin: 0 auto;

  img {
    width: unset;
    height: unset;
    max-width: 100%;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const PostTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;

  @media screen and (max-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const PostTag = styled.div`
  margin-bottom: 1rem;
`;

const PostContent = styled.div`
  font-size: 1.25rem;
  font-weight: 100;

  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }

  a {
    color: #000;
  }
`;

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      post   : {
        title: props.location.postTitle,
      },
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const guid = match.params.id;

    // Scroll to top
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    FPTUSDK.crawl
      .getArticleDetails("codedao", guid)
      .then(data => {
        this.setState({
          loading: false,
          post   : data,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          post   : null,
        });
      });
  }

  render() {
    const { post, loading } = this.state;

    if (!post) {
      return <NotFound />;
    }

    return (
      <Content className="content-container">
        <Helmet>
          <title>{(post && post.title) || "Medium for Devs - FUHCM.com"}</title>
        </Helmet>
        <BackTop />
        <div className="content-wrapper">
          <Link to="/toidicodedao">
            <Button
              type="primary"
              size="large"
              style={{ marginBottom: "1rem" }}
            >
              <Icon type="caret-left" />
              {' '}
Quay lại danh sách bài
            </Button>
          </Link>
          <PostBody>
            <PostTitle>{post && post.title}</PostTitle>

            <div hidden={!loading}>
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </div>

            <PostTag>
              {post &&
                post.categories &&
                post.categories.length &&
                post.categories.map(item => {
                  return (
                    <Tag
                      color="green"
                      key={item}
                      style={{ marginBottom: "0.5rem" }}
                    >
                      {item.charAt(0).toLowerCase() + item.slice(1)}
                    </Tag>
                  );
                })}
            </PostTag>

            <img
              src={(post && post.thumbnail && post.thumbnail) || ""}
              alt=""
              hidden={loading}
            />

            <PostContent
              //eslint-disable-next-line
              dangerouslySetInnerHTML={{
                __html: post && post.content,
              }}
            />

            <DisqusComponent
              guid={post && post.guid}
              title={post && post.title}
            />
          </PostBody>
        </div>
      </Content>
    );
  }
}

export default Post;
