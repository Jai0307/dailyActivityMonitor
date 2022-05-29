import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Router from "next/router";
import MessageModal from "components/MessageModal";
import { validateEmail } from "utils/helperfunctions";
import { userContext } from 'usercontext';

const LoginPage: NextPage = (props) => {

    useEffect(() => {
        const user:any = Object.keys(userContext.userValue).length!==0 ? JSON.parse(userContext.userValue.toString()):null;
        if(user && user.status == 200){
            Router.push("/")
        }
    }, [userContext])

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [modalheader, setmodalheader] = useState('');
    const [modalmessage, setmodalmessage] = useState('');
    const [modalstate, setmodalstate] = useState(false);
  
    const openModal = (header: string, message: string, progress?: boolean) => {
      setmodalheader(header)
      setmodalmessage(message);
      setmodalstate(true);
    }

    const onloginenter = (e: any) =>{
        if(e.key === "Enter"){
          submit();
        }
      }

    const submit = async () => {
        const user = await userContext.login(email, password);
        // console.log(`user ${(JSON.parse(user))}`);
        if(user.status==200){
            Router.push("/")
            return;
        }
        openModal("Login failed", "Invalid credentials")
    }

  return (
    <>
      <Head>
        <title>Login-Daily Activity Monitor</title>
        <meta
          name="description"
          content="Daily Activity Monitor"
        />
      </Head>
      <MainContainer>
          <MessageModal header={modalheader} message={modalmessage} state={modalstate} handleClose={()=> setmodalstate(false)} />
          <Header>Login</Header>
          <Input placeholder="email" value={email} onChange={(e) => setemail(e.target.value)} />
          <Input type="password" placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)} onKeyPress={(e) =>{onloginenter(e)}} />
          <Button onClick={submit}>Login</Button>
      </MainContainer>
    </>
  );
};

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 85vh;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  margin-top:-100px;
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 5px;
`

export const Column = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  flex: 1;
  color: #ffffff;
  @media (max-width: 770px) {
    padding: 20px 50px;
  }
`

const Header = styled.div`
    padding: 10px;
    font-weight: 700;
    font-size: 40px;
    justify-content: flex-end;
    color: black;
`;

const SubHeader = styled.div`
    font-weight: 700;
    font-size: 25px;
    justify-content: flex-end;
`;

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
  background-color: #4d4dae;
  min-width: 75px;
  transition: ease 0.5s;
  &:hover {
    font-weight: 700;
    background-color: #212122;
  }
`

const SmallButton = styled.div`
  margin: 5px;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  text-transform: uppercase;
  padding: 7px;
  font-weight: 500;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #4d4dae;
  min-width: 50px;
  transition: ease 0.5s;
  &:hover {
    font-weight: 700;
    background-color: #212122;
  }
`
const ButtonDiv = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
    padding: 10px;
    background-color: #eee;
    border: 1px solid black;
    margin: 10px;
    width: 250px;
    border-radius: 3px;
`
export default LoginPage;
