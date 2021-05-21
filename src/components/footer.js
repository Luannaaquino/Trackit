import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TasksContext from "../contexts/tasksContext";

export default function Footer() {
  return (
    <Bottom>
      <PageLink>Hábitos</PageLink>
      <div>
        <CircularProgressbar
          value={75}
          text={`Hoje`}
          background
          backgroundPadding={6}
          styles={buildStyles({
            backgroundColor: "#52B6FF",
            textColor: "#fff",
            pathColor: "#fff",
            trailColor: "transparent",
          })}
        />
      </div>
      <PageLink>Histórico</PageLink>
    </Bottom>
  );
}

const Bottom = styled.div`
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  div {
    height: 90px;
    width: 90px;
    position: fixed;
    bottom: 10px;
    left: calc(50vw - 45px);
  }
`;

const PageLink = styled.p`
  font-size: 18px;
  line-height: 22px;
  color: #52b6ff;
`;