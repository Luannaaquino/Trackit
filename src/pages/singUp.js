import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Loader from "react-loader-spinner";// biblioteca
import logo from "../images/logo.png";

export default function SignUp() {
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  let history = useHistory();

  function loading(e) {
    e.preventDefault();
    setDisabled(true);
    const data = {
      email,
      name,
      image,
      password,
    };
    const request = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      data
    );

    request.then(() => {
      history.push("/");
    });
    request.catch((error) => {
      alert(error.response.data.message);
      setDisabled(false);
    });
  }

  return (
    <StyledSingUpPage>
      <img src={logo} alt="Logo TrackIt" />
      <Form onSubmit={loading}>
        <Input
          type="text"
          placeholder="email"
          disabled={disabled}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="senha"
          disabled={disabled}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="nome"
          disabled={disabled}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="foto"
          disabled={disabled}
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <Button type="submit" disabled={disabled}>
          {disabled ? (
            <Loader type="ThreeDots" color="#FFF" height={45} width={80} />
          ) : (
            "Cadastrar"
          )}
        </Button>
      </Form>
      <LoginLink
        onClick={() => {
          if (disabled) {
            return;
          } else {
            history.push("/");
          }
        }}
        disabled={disabled}
      >
        Já tem uma conta? Faça login!
      </LoginLink>
    </StyledSingUpPage>
  );
}

const StyledSingUpPage = styled.div`
  width: 100%;
  background-color: #fff;
  padding-top: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 180px;
    height: 180px;
    margin-bottom: 30px;
  }
`;


const Input = styled.input`
  width: 300px;
  height: 45px;
  padding: 10px;
  margin-bottom: 6px;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  ::placeholder {
    font-size: 20px;
    line-height: 25px;
    color: #dbdbdb;
  }
`;

const Button = styled.button`
  width: 300px;
  height: 45px;
  background: #52b6ff;
  border-radius: 5px;
  border: none;
  margin-bottom: 25px;
  font-size: 21px;
  line-height: 26px;
  text-align: center;
  color: #fff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginLink = styled.a`
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  text-decoration-line: underline;
  color: #52b6ff;
`;