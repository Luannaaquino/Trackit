import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <StyledHeader>
      <Logo>TrackIt</Logo>
      <img src={user.image} alt="User" />
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  position: fixed;
  width: 375px;
  height: 70px;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #126ba5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  img {
    width: 51px;
    height: 51px;
    border-radius: 98.5px;
    margin-right: 20px;
  }
`;

const Logo = styled.p`
  font-family: "Playball", cursive;
  font-size: 39px;
  line-height: 49px;
  color: #ffffff;
  margin-left: 20px;
`;