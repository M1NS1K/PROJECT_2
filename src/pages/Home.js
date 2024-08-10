import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

const Container = styled.div`
  padding: 20px;
  max-width: 400px;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const WriteButton = styled.button`
  padding: 10px;
  background-color: #fee500;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  display: block;
  width: 100%;

  &:hover {
    background-color: #ffd500;
  }
`;

function Home() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/api/read/article')
      .then(response => {
        console.log(response.data); // 데이터 확인용 콘솔 로그
        setPosts(response.data);
      })
      .catch(error => {
        console.error("Error fetching posts!", error);
      });
  }, []);

  const addPost = (post) => {
    axios.post('http://localhost:8080/api/create', post)
      .then(response => {
        setPosts([...posts, response.data]);
        setShowForm(false); // 글쓰기 폼이 닫히도록 설정
      })
      .catch(error => {
        console.error("Error adding post!", error);
      });
  };

  const handleSelectPost = (id) => {
    // 게시물 선택 시 상세 페이지로 이동하도록 구현
    window.location.href = `/posts/${id}`;
  };

  return (
    <div>
      <Navbar />
      <Container>
        <WriteButton onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Write a Post"}
        </WriteButton>
        {showForm && <PostForm onSubmit={addPost} />}
        <PostList posts={posts} onSelectPost={handleSelectPost} />
      </Container>
    </div>
  );
}

export default Home;
