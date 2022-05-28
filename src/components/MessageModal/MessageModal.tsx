import React, { useState, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'

interface MessageModalI {
  header?: string
  message?: string
  state: boolean
  handleClose(): void
  progress?: boolean
}

const MessageModal: React.FC<MessageModalI> = ({
  header,
  message,
  state,
  handleClose,
  progress,
}) => {
  return (
    <>
      {state && (
        <>
          <StyledBackdrop />
          <StyledModal>
            <HeaderContainer>
              <Header>{header}</Header>
              <CloseIcon onClick={handleClose}>X</CloseIcon>
            </HeaderContainer>
            <Body>
              {message}
              <CloseIcon onClick={handleClose}>Close</CloseIcon>
            </Body>
          </StyledModal>
        </>
      )}
    </>
  )
}

const StyledBackdrop = styled.div`
  background-color: #000;
  opacity: 0.95;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 500%;
  z-index: 999;
`

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  background: #ffffff;
  border-radius: 10px;
  width: min(500px, 75%);
  top: 50%;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
`

const HeaderContainer = styled.div`
  display: flex;
  padding: 20px;
  background-color: #eee;
  border-radius: 10px 10px 0 0;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
  color: black;
`

const Header = styled.div`
  display: flex;
  font-size: 25px;
  font-weight: 600;
`

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 2;
  white-space: pre-wrap;
  font-size: 14px;
  font-weight: 500;
  color: black;
  margin: 10px;
  padding: 10px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const CloseIcon = styled.div`
  cursor: pointer;
  font-size: 20px;
  font-weight:500;
  background-color: #eee;
  padding: 5px 10px;
  margin: 10px;
  border-radius: 3px;
  background-color: #4D2FA2;
  color: white;
  transition: ease 0.5s;
  &:hover{
    font-weight:700;
    background-color: #212122;
  }
`;  

export default MessageModal
