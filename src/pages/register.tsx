import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Router from "next/router";
import MessageModal from "../components/MessageModal";
import { validateEmail } from "../utils/helperfunctions";

const Register: React.FC = props => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [modalheader, setmodalheader] = useState('');
  const [modalmessage, setmodalmessage] = useState('');
  const [modalstate, setmodalstate] = useState(false);
  const [verificationcode, setverificationcode] = useState('');
  const [coderequested, setcoderequested] = useState(false);
  const [disableemail, setdisableemail] = useState(false);

  const openModal = (header: string, message: string, progress?: boolean) => {
    setmodalheader(header)
    setmodalmessage(message);
    setmodalstate(true);
  }

  const register = () => {
    const config = {
      headers: { 'Content-Type': 'application/json'},
    };

    const body = {
        email: email,
        verificationcode: verificationcode,
        password: password
    }
    axios.post("/api/registeruser", body, config).then((res:any) => {
      if(res.data.status==200){
          Router.push("/login");
        }else{
          openModal("Error", res.data.msg);
      }

    }).catch(error=> {
        console.log(error)
        openModal("Login failed", "Invalid credentials.");
      })
  }

  const requestcode = () => {
    if(!validateEmail(email)){
      openModal("Error", "Invalid email address.")
      return;
    }

    const config = {
      headers: { 'Content-Type': 'application/json'},
    };

    const body = {
        email: email,
    }
    axios.post("/api/getemailverificationcode", body, config).then((res:any) => {
      console.log(`res ${JSON.stringify(res.data)}`);
      if(res.data.status==200){
          setcoderequested(true);
          setdisableemail(true);
          openModal("Message", res.data.msg);
        }else{
          openModal("Error", res.data.msg);
      }

    }).catch(error=> {
        console.log(error)
        openModal("Login failed", "Invalid credentials.");
      })
  }

  return(
    <MainContainer>
      <Head>
        <title>Login-Daily Activity Monitor</title>
        <meta
          name="description"
          content="Daily Activity Monitor"
        />
      </Head>
      <MainContainer>
          <MessageModal header={modalheader} message={modalmessage} state={modalstate} handleClose={()=> setmodalstate(false)}/>
          <Header>Register</Header>
          <Input placeholder="email" value={email} onChange={(e) => setemail(e.target.value)} disabled={disableemail}  autoComplete={"off"} />
          {!coderequested?
            <Button onClick={requestcode}>Request Code</Button>
            :<>
            <Input placeholder="verification code" value={verificationcode} onChange={(e) => setverificationcode(e.target.value)} />
            <Input type="password" placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)} autoComplete={"new-password"} />
            <Button onClick={register}>Register</Button>
            </>
          }
      </MainContainer>
  </MainContainer>
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

export default Register;
