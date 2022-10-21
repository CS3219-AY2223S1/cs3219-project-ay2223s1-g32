import * as React from "react";
import {
  Box,
  Button,
  Link,
  Select,
  MenuItem,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel
} from "@mui/material";
import { LOGOUT_USER_SVC } from "../configs";
import { STATUS_CODE_FAILED, STATUS_CODE_SUCCESS } from "../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import TopNavBar from "../components/TopNavBar";

export default function BasicSelect() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = React.useState("Easy");
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogMsg, setDialogMsg] = useState("")
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);
  const redirect = useNavigate() // re-direct api

  const handleChange = (event) => {
    setDifficulty(event.target.value);
    console.log(event.target.value);
  };
  const closeDialog = () => setIsDialogOpen(false)

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true)
    setDialogTitle('Error')
    setDialogMsg(msg)
  }

  const confirmButton = () => {
    navigate("/matching", { state : { difficulty: difficulty }});
  }

  return (
    <>
    <TopNavBar  />
      <h1 style={{marginBottom: 20, fontSize: 28}}>Select your difficulty: </h1>
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
