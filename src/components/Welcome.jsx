import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Robot from "../assets/robot.gif";

const Welcome = () => {
  const [userName, setUserName] = useState("");

  useEffect(() =>{
    const fetchData6 = async () => {
      setUserName(
        await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).username
      );
    }
    fetchData6();
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

export default Welcome;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;

  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`
