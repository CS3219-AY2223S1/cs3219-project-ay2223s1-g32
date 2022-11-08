import styled from "styled-components";

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  padding: 0px 25px;
  margin: 20px 0 30px;
  position: relative;
  top: 12px;
`;


export const MatchedTitle = styled.h1`
  position: relative;
  font-size: 22;
  margin-top: 60px;
  top: 10px;
  text-align:center;
  align-self: center;
  font-weight: 600;
`;


export const MatchedPara = styled.h4`
  position: relative;
  font-size: 14;
  top: 10px;
  text-align:center;
  align-self: center;
  font-weight: 400;
`;

export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 900px;
  max-width: 100%;
  min-height: 470px;
  align-self: center;
`;

export const CenterContainer = styled.div`
  background-color: transparent;
  border-radius: 10px;
  box-shadow: 0 14px 28px #2d73c3, 0 10px 10px #2d73c3;
  position: relative;
  overflow: hidden;
  width: 500px;
  max-width: 100%;
  min-height: 400px;
  align-self: center;
  margin-top:150px;
  align-items:center;
`;


export const Title = styled.h1`
  align-self:center;
  font-weight: bold;
`;

export const Input = styled.input`
  position: relative;
  top: 5px;
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

export const Button = styled.button`
  position: relative;
  top: 30px;
  border-radius: 20px;
  border: 1px solid #2d73c3;
  background-color: #2d73c3;
  color: #ffffff;
  font-size: 12px;
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

export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
  position: absolute;
  top: 315px;
`;


export const MatchingButton = styled.button`
  position: relative;
  top: 20px;
  border-radius: 20px;
  border: 1px solid #2d73c3;
  background-color: #2d73c3;
  color: #ffffff;
  font-size: 12px;
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

export const MatchingGhostButton = styled(MatchingButton)`
  background-color: transparent;
  align-self:center;
  position: relative;
  top: 10px;
  border-radius: 20px;
  border: 1px solid #2d73c3;
  color: #2d73c3;
  margin-top:10px;
`;
