import * as React from 'react';
import {
  Box,
  Button,
  Container
} from "@mui/material";
import AccountMenu from './AccountMenu.js';
import { useNavigate } from "react-router-dom";

export default function TopNavBar() {
  const navigate = useNavigate() // re-direct api

  return (
    <Container maxWidth={false}
        sx={{ width: document.documentElement.width, display: 'flex', justifyContent:'space-between', paddingBottom: 4, marginTop: -4}}
    >
    <Box 
        sx={{
            display: 'flex-start',
            alignSelf:"flex-start",
            alignItems: 'center',
            textAlign: 'center',
            marginLeft:-3
        }}>
        <Button onClick={()=>{navigate('/selectdifficulty')}}>
        <img
            src={require('../assets/homeLogo.png')}
            alt={"Coding Comrades Logo"}
            width={200} 
        />
        </Button>
    </Box>
    <Box sx={{ alignSelf:"flex-end", alignItems: 'center', textAlign: 'center', marginTop:-5}}>
    <AccountMenu  />
    </Box>
  </Container>
  );
}
