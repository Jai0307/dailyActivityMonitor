import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components';

const Home: NextPage = () => {
  return (
    <MainContainer>
      <Column>
        <Header>Analyze Data</Header>
        


        <Button>Start</Button>
      </Column>
    </MainContainer>
);
};

const MainContainer = styled.div`
display: flex;
min-height: 85vh;
color: #000000;
@media (max-width: 770px) {
flex-direction: column;
}
`

const Row = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`

const Column = styled.div`
padding: 50px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
flex: 1;
color: #000000;
@media (max-width: 770px) {
padding: 20px 50px;
}
`
const Header = styled.h3`
color: #000000;
`;

const Input = styled.input`
  padding: 10px;
  background-color: #eee;
  border: 1px solid black;
  margin: 10px;
  width: 250px;
  border-radius: 3px;
`

const Button = styled.div`
  margin: 5px;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  text-transform: uppercase;
  padding: 10px;
  font-weight: 700;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #4D2FA2;
  min-width: 75px;
  transition: ease 0.5s;
  &:hover {
    font-weight: 700;
    background-color: #212122;
  }
`

export default Home
