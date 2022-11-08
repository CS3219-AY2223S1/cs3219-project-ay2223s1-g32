import * as React from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";

export default function BasicSelect({ authed }) {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = React.useState("Easy");

  const handleChange = (event) => {
    setDifficulty(event.target.value);
    console.log(event.target.value);
  };

  const confirmButton = () => {
    navigate("/matching", { state: { difficulty: difficulty } });
  }

  return (
    <>
      <TopNavBar />
      <h1 style={{ marginBottom: 20, fontSize: 28 }}>Select your difficulty: </h1>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={difficulty}
            label="Difficulty"
            onChange={handleChange}
          >
            <MenuItem value={"Easy"}>Easy</MenuItem>
            <MenuItem value={"Medium"}>Medium</MenuItem>
            <MenuItem value={"Difficult"}>Difficult</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button onClick={confirmButton} style={{ width: 100, marginTop: 10 }}>Confirm</Button>
    </>
  );
}
