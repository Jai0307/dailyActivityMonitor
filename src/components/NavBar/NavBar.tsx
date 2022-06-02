import React, { FC, useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import styled, { keyframes } from 'styled-components'
import MenuLink from './MenuLink';
import Menu from '../../assets/menu.png';
import Image from 'next/image';
import { userContext } from "usercontext"
import MenuButton from './MenuButton';

const Navbar: FC = props => {
  const [user, setUser] = useState<any>(null);
  const [hidemenu, sethidemenu] = useState(true);

  useEffect(() => {
    const user:any = Object.keys(userContext.userValue).length!==0 ? JSON.parse(userContext.userValue.toString()):null;
    if(user && user.status == 200){
      setUser(user);
    }else{
      setUser(null);
    }
  }, [userContext, userContext.userValue]);

  const hidemobilemenu = () => {
    if(!hidemenu){
      sethidemenu(true)
    }
  }

  const logout = () => {
    userContext.logout();
  }


  return (
    <>
      <StyledNavBar onClick={hidemobilemenu}>
        <StyledNavBarInner>
          <Logo>
            <MenuIcon onClick={()=>sethidemenu(!hidemenu)}><Image src={Menu} /></MenuIcon>
            <Link href="/">
                <LogoAndImgContainer>
                    <LogoText>Activity Monitor</LogoText>
                </LogoAndImgContainer>
            </Link>
          </Logo>
          {!hidemenu?
          <StyledBackdrop>
            <MobileMenuContainer>
              <LogoTextMobile>Activity Monitor</LogoTextMobile>
              <MenuLink key={`menuhome`} link={'/'} text={'Home'}></MenuLink>
              <MenuLink key={`menuanalysis`} link={'/analysis'} text={'Analysis'} ></MenuLink>
              <MenuLink key={`menusettings`} link={'/settings'} text={'Settings'} ></MenuLink>
              {user && user.status==200?

                <MenuLink key={`menulogout`} link={'/logout'} text={'Logout'} ></MenuLink>:
                <>
                  <MenuLink key={`menuregister`} link={'/register'} text={'Register'} ></MenuLink>
                  <MenuLink key={`menulogin`} link={'/login'} text={'Login'} ></MenuLink>
                </>

              }
            </MobileMenuContainer>
          </StyledBackdrop>
            :<></>
          }
            <MenuContainer>
              <MenuLink key={`menuhome`} link={'/'} text={'Home'}></MenuLink>
              <MenuLink key={`menuanalysis`} link={'/analysis'} text={'Analysis'} ></MenuLink>
              <MenuLink key={`menusettings`} link={'/settings'} text={'Settings'} ></MenuLink>
              {user && user.status==200?

                <MenuButton key={`menulogout`} text={'Logout'} handleClick={logout}></MenuButton>:
                <>
                  <MenuLink key={`menuregister`} link={'/register'} text={'Register'} ></MenuLink>
                  <MenuLink key={`menulogin`} link={'/login'} text={'Login'} ></MenuLink>
                </>

              }
            </MenuContainer>
            
          
        </StyledNavBarInner>
      </StyledNavBar>
    </>
  )
}

const slideIn = keyframes`
  0% {
    transform: translateX(-100%)
  }
  100% {
    transform: translateX(0);
  }
`

const MenuIcon = styled.div`
  display: none;
  @media (max-width: 770px) {
      display: flex;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  color: #000000;
  @media (max-width: 770px) {
    display: none;
  }
`

const MobileMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-text: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: white;
  color: #FFFFFF;
  width: 50%;
  padding: 25px;
  transition: ease 0.5s;
  animation: ${slideIn} 0.3s forwards ease-out;
  `;

const StyledNavBar = styled.div`
  align-items: center;
  color: #000000;
`
const StyledNavBarInner = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  color: #000000;
  @media (max-width: 770px) {
    flex-direction: column;
  }
`
const StyledBackdrop = styled.div`
  background-color: #000000;
  opacity: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
`;

const LogoText = styled.div`
  color: #000000;
  font-size: 45px;
  font-weight: 700;
  padding-left: 10px;
  color: #000000;
  @media (max-width: 860px) {
    padding-left: 5px;
  }
`

const LogoTextMobile = styled.div`
  color: #000000;
  font-size: 25px;
  font-weight: 700;
  padding-left: 10px;
  color: #000000;
`

const Logo = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
`
const IconDiv = styled.div`
  display: none;
  @media (max-width: 770px) {
    display: block;
  }
`

const LogoAndImgContainer = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
`

const LogoImgContainer = styled.div`

`
export default Navbar
