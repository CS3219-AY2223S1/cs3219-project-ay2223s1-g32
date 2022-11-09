import styled from "@emotion/styled";

export const Title = styled.h1`
  position: absolute;
  top: 10px;
  font-weight: bold;
`;

export const AccountSettingsHeader = styled.h2`
  position: relative;
  top:-30px;
  font-weight: 500px;
`;

export const AccountSettingsButton = styled.button`
  position: relative;
  top: 25px;
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

export const AccountSettingsGhostButton = styled(AccountSettingsButton)`
  background-color: transparent;
  border-color: #ffffff;
  position: absolute;
  top: 315px;
`;

export const ASParagraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  letter-spacing: 0.5px;
  margin: 0px 0 30px;
  position: absolute;
  top: 250px;
`;