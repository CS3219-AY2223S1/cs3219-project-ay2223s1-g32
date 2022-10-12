import * as React from "react";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate, useLocation } from "react-router-dom";

export default function MatchedPage() {
	
	const navigate = useNavigate();
	const location = useLocation();
  const difficulty = location.state.difficulty;
	console.log("matched difficulty: " + difficulty);

  const backButton = () => {
    navigate("/matching", { state : { difficulty: difficulty }});
  }

  return (
    <>
    <h1 style={{fontSize: 28, textAlign: "center"}}>Congratulations!</h1>
    <h1 style={{fontSize: 18, textAlign: "center"}}>You have been matched with a user.</h1>
		<h1 style={{marginBottom: 20, fontSize: 18, textAlign: "center"}}>Difficulty level: {difficulty}</h1>
		<Button onClick={backButton} style={{width: 100, marginTop: 10, alignSelf: "center"}}>Go back</Button>
    </>
  );
}
