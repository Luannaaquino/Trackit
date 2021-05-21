import styled from "styled-components";
import { Checkbox } from "react-ionicons";
import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import TasksContext from "../contexts/tasksContext";

export default function Tasks({ todayTasks, setTodayTasks }) {
  const { user } = useContext(UserContext);
  const { ratio, setRatio } = useContext(TasksContext);
  let tasksNumber = todayTasks.length;
  let tasksDone = todayTasks.reduce((acc, t) => (t.done ? (acc += 1) : acc), 0);

  useEffect(() => setRatio(Math.round((100 * tasksDone) / tasksNumber)));
  let isTaskLoading = false;

  function toggle(task) {
    if (isTaskLoading) {
      return;
    }
    isTaskLoading = true;
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const data = task;
    if (task.done) {
      const request = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${task.id}/uncheck`,
        data,
        config
      );

      request.then(() => {
        todayTasks.forEach((t) => {
          if (t.id === task.id) {
            t.done = false;
            t.currentSequence -= 1;
          }
        });
        setTodayTasks([...todayTasks]);
        isTaskLoading = false;
      });
      request.catch(() => {
        alert("Erro ao atualizar tarefa");
        isTaskLoading = false;
      });
    } else {
      const request = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${task.id}/check`,
        data,
        config
      );

      request.then(() => {
        todayTasks.forEach((t) => {
          if (t.id === task.id) {
            t.done = true;
            if (t.currentSequence === t.highestSequence) {
              t.highestSequence += 1;
            }
            t.currentSequence += 1;
          }
        });
        setTodayTasks([...todayTasks]);
        isTaskLoading = false;
      });
      request.catch(() => {
        alert("Erro ao atualizar tarefa");
        isTaskLoading = false;
      });
    }
  }

  return (
    <>
      <PageSubtitle progress={tasksDone > 0}>
        {tasksDone === 0
          ? "Nenhum hábito concluído ainda"
          : `${ratio}% dos hábitos concluídos`}
      </PageSubtitle>
      {todayTasks.map((t) => {
        return (
          <Task onClick={() => toggle(t)} key={t.id}>
            <div>
              <Title>{t.name}</Title>
              <Subtitle checked={t.done}>
                Sequência atual:{" "}
                <span>
                  {t.currentSequence} {t.currentSequence === 1 ? "dia" : "dias"}
                </span>
              </Subtitle>
              <Subtitle
                checked={t.done && t.currentSequence === t.highestSequence}
              >
                Seu recorde:{" "}
                <span>
                  {t.highestSequence} {t.highestSequence === 1 ? "dia" : "dias"}
                </span>
              </Subtitle>
            </div>
            <Checkbox
              color={t.done ? "#8FC549" : "#EBEBEB"}
              height="70px"
              width="70px"
            />
          </Task>
        );
      })}
    </>
  );
}

const Title = styled.p`
  font-size: 20px;
  line-height: 25px;
  color: #666;
  margin-bottom: 5px;
`;


const Subtitle = styled.p`
  font-size: 13px;
  line-height: 16px;
  color: "#666";
`;

const PageSubtitle = styled.p`
  margin-bottom: 25px;
  font-size: 18px;
  line-height: 22px;
  
`;

const Task = styled.div`
  width: 340px;
  height: 94px;
  background: #fff;
  border-radius: 5px;
  padding: 13px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;