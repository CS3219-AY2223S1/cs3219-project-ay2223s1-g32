import * as React from 'react';
import {
  Box,
  Container,
} from "@mui/material";
import AccountMenu from './AccountMenu.js';
import { useNavigate } from "react-router-dom";
import * as Components from "./Components";
import "./styles.css";

export default function TopNavBar() {
  const navigate = useNavigate() // re-direct api

  return (
    <Container maxWidth={true}
      sx={{ width: document.documentElement.width, display: 'flex', justifyContent: 'space-between', paddingBottom: 4, marginTop: -20 }}
    >

      <Components.HomeButton onClick={() => { navigate('/selectdifficulty') }}>Home</Components.HomeButton>
      <Components.Container><AccountMenu /> </Components.Container>
    </Container>
  );
}
