import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  background-color: #fee500;
  padding: 10px;
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

function Navbar() {
  return (
    <NavbarContainer>
      게시판
    </NavbarContainer>
  );
}

export default Navbar;
