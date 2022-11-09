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
  const difficulty = location.state == null ? "" : location.state.difficulty;
  const roomID = location.state == null ? "" : location.state.roomID;
  const [isValidUser, setIsValidUser] = React.useState(false);

  React.useEffect(() => {
    if (document.cookie.split('; ').find((row) => row.startsWith('authToken=')) != null) {
      setIsValidUser(true);
    }
  }, []);

  const backButton = () => {
    navigate("/matching", { state: { difficulty: difficulty } });
  }

  const toTPage = () => {
    navigate("/testpage", { state: { difficulty: difficulty, roomID: roomID } });
  }

  if (!isValidUser) {
    return (
      <h1>Page not found</h1>
    );
  } else {
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
}
