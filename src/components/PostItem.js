import React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #ccc;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const PostTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const PostViews = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
`;

function PostItem({ post, onSelectPost }) {
  return (
    <ItemContainer onClick={() => onSelectPost(post.id)}>
      <PostTitle>{post.title}</PostTitle>
      <p>{post.content.substring(0, 100)}...</p>
      <PostViews>조회수: {post.views}</PostViews> {/* 조회수 표시 */}
    </ItemContainer>
  );
}

export default PostItem;
