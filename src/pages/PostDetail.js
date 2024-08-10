import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const EditButton = styled.button`
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled.button`
  padding: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e53935;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  height: 100px;
`;

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/read/article/${id}`)
        .then(response => {
          setPost(response.data);
          setEditTitle(response.data.title);
          setEditContent(response.data.content);
        })
        .catch(error => {
          console.error("Error fetching post details!", error);
        });
    } else {
      console.error("Invalid ID");
    }
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/delete?id=${id}`)
      .then(() => {
        alert("Post deleted successfully!");
        navigate('/'); // 메인 페이지로 리다이렉트
      })
      .catch(error => {
        console.error("Error deleting post!", error);
      });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditSubmit = () => {
    axios.put(`http://localhost:8080/api/update?id=${id}`, {
      title: editTitle,
      content: editContent
    })
      .then(() => {
        alert("Post updated successfully!");
        setIsEditing(false);
        setPost({ ...post, title: editTitle, content: editContent });
      })
      .catch(error => {
        console.error("Error updating post!", error);
      });
  };

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
  <Container>
      {isEditing ? (
        <div>
          <Input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <TextArea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <ButtonContainer>
            <EditButton onClick={handleEditSubmit}>Save</EditButton>
            <DeleteButton onClick={handleEditToggle}>Cancel</DeleteButton>
          </ButtonContainer>
        </div>
      ) : (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <p><strong>조회수:</strong> {post.views}</p>
          <ButtonContainer>
            <EditButton onClick={handleEditToggle}>Edit</EditButton>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </ButtonContainer>
        </div>
      )}
    </Container>
  );
}

export default PostDetail;
