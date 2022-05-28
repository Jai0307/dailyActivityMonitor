import React from 'react'
import styled from 'styled-components'

interface buttonI {
  text: string
  link?: string
}

const MenuLink: React.FC<buttonI> = ({ text, link }) => {
  return (
    <StyledButton>
      {link != '' ? <LinkDiv href={link}>{text}</LinkDiv> : <Text>{text}</Text>}
    </StyledButton>
  )
}

const StyledButton = styled.div`
  display: flex;
  margin: 0 5px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  @media (max-width: 770px) {
    margin: 5px;
  }
`

const LinkDiv = styled.a`
  text-decoration: none;
  color: #000000;
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  transition: ease 0.5s;
  &:hover {
    text-decoration: none;
    background-color: #212122;
  }
`

const Text = styled.div`
  display: flex;
  color: #000;
  padding: 5px;
  font-size: 14px;
  white-space: nowrap;
`

export default MenuLink
