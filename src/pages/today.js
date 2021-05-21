import { useEffect, useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../components/header";
import Footer from "../components/footer";
import UserContext from "../contexts/UserContext";
import Tasks from "../components/tasks";

export default function Today() {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );

    request.then((response) => {
      if (response.data.length === 0) {
        setTasks([null]);
      } else {
        setTasks(response.data);
      }
      console.log(response.data);
    });

    request.catch((error) => console.log(error.response));
  }, [user.token]);

  return (
    <>
      <Header />
      <Container>
        <Title>Quarta, 19/05</Title>
        <Subtitle> Nenhum hábito concluído ainda </Subtitle>
        {tasks.length === 0 ? (
         ""
        ) : tasks[0] !== null ? (
          <Tasks tasks={tasks} />
        ) : (
          ""
        )}
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  padding: 25px 18px 30px;
  margin: 70px 0px;
  width: 100%;
`;

const Title = styled.p`
  font-size: 23px;
  line-height: 29px;
  color: #126ba5;
`;

const Subtitle = styled.p`
  margin-bottom: 25px;
  font-size: 18px;
  line-height: 22px;
`;