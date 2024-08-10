import React from 'react';
import styled from 'styled-components';
import PostItem from './PostItem';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

function PostList({ posts, onSelectPost }) {
  return (
    <ListContainer>
      {posts && posts.length > 0 ? (
        posts.map(post => (
          <PostItem key={post.id} post={post} onSelectPost={onSelectPost} />
        ))
      ) : (
        <p>게시물이 없습니다.</p>
      )}
    </ListContainer>
  );
}

export default PostList;
