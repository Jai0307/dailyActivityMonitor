import React from "react";
import styled from "styled-components";

interface buttonI {
  text: string;
  handleClick: () => void;
}

const MenuButton: React.FC<buttonI> = ({ text, handleClick }) => {
  return <StyledButton onClick={handleClick}>{text}</StyledButton>;
};

const StyledButton = styled.div`
  display: flex;
  margin: 0 5px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  color: #000000;
  border-radius: 3px;
  padding: 5px;
  transition: ease 0.5s;
  &:hover {
    background-color: #212122;
    text-decoration: none;
  }
`;

export default MenuButton;
