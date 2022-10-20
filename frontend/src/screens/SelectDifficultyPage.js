import * as React from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import AccountMenu from '../components/AccountMenu.js';
import { useNavigate } from "react-router-dom";

export default function BasicSelect() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = React.useState("Easy");

  const handleChange = (event) => {
    setDifficulty(event.target.value);
    console.log(event.target.value);
  };
  
  const confirmButton = () => {
    navigate("/matching");
  }

  return (
    <>
      <AccountMenu />
      <text style={{ marginBottom: 20, fontSize: 28 }}>Select your difficulty: </text>
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
