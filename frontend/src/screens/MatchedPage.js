import * as React from "react";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate, useLocation } from "react-router-dom";
import TopNavBar from "../components/navBar/TopNavBar";
import * as Components from "../components/selectDifficulty/Components";
import "../components/selectDifficulty/styles.css";

export default function MatchedPage() {
  const navigate = useNavigate();
  const location = useLocation();
  // const difficulty = location.state.difficulty;
  // const roomID = location.state.roomID;
  const difficulty = "Easy";
  // location.state.difficulty;
  const roomID = 1;
  // document.cookie.split('; ').find((row) => row.startsWith('username=')).split('=')[1];

  const backButton = () => {
    navigate("/matching", { state: { difficulty: difficulty } });
  }

  const toTPage = () => {
    navigate("/testpage", { state: { difficulty: difficulty, roomID: roomID } });
  }

  return (
    <>
      <TopNavBar />
      <Components.CenterContainer>
        <Components.MatchedTitle>Congratulations!</Components.MatchedTitle>
        <Components.MatchedPara>You have been matched with a user.</Components.MatchedPara>
        <Components.MatchedPara>Difficulty level: {difficulty}</Components.MatchedPara>
        <Box sx={{
          display: 'flex'
        }}
          flexDirection={"column"} justifyContent={'center'} alignSelf={'center'} >
          <Components.MatchingGhostButton onClick={toTPage} >Start Coding</Components.MatchingGhostButton>
          <Components.MatchingGhostButton onClick={backButton}>Go back</Components.MatchingGhostButton>
        </Box>
      </Components.CenterContainer>
    </>
  );
}
