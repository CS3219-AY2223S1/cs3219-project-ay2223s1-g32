import * as React from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TopNavBar from "../components/navBar/TopNavBar";
import * as Components from "../components/selectDifficulty/Components";
import "../components/selectDifficulty/styles.css";

export default function BasicSelect() {
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
      <Components.Title style={{ marginBottom: 20, fontSize: 28 }}>Select your difficulty: </Components.Title>
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
      <Components.Button onClick={confirmButton}>
        Confirm choice
      </Components.Button>
      {/* <Button onClick={confirmButton} style={{ width: 100, marginTop: 10 }}>Confirm</Button> */}
    </>
  );
}
