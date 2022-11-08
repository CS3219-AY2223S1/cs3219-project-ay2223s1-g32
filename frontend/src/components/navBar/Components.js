import styled from "styled-components";

export const Title = styled.h1`
  position: absolute;
  top: 10px;
  font-weight: bold;
`;

export const Container = styled.div`
  background-color: transparent;
  position: absolute;
  top: 15px;
  right: 20px;
  overflow: hidden;
  align-self: flex-end;
`;

export const HomeButton = styled.button`
  position: absolute;
  top: 15px;
  left: 10px;
  color: black;
  background-color: transparent;
  border-color: transparent;
  font-size: 20px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;
