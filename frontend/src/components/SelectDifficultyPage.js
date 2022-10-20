import * as React from "react";
import {
  Box,
  Button,
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
import AccountMenu from './AccountMenu.js';
import { LOGOUT_USER_SVC } from "../configs";
import { STATUS_CODE_FAILED, STATUS_CODE_LOGGEDIN } from "../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

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

  const handleLogout = async () => {
    const userAuthToken = document.cookie.split('; ').find((row) => row.startsWith('authToken=')).split('=')[1];
    const res = await axios.post(LOGOUT_USER_SVC, { 
      headers: {
        "Authorization": `Bearer ${userAuthToken}`
      } }).catch((err) => {
        if (err.response.status === STATUS_CODE_FAILED) {
          setErrorDialog(err.response.data.message);
        } else {
          setErrorDialog('Please try again later')
        }
      })
    if (res && res.status === STATUS_CODE_LOGGEDIN) {
      setIsLogoutSuccess(true);
      redirect("/");
    }
  }
  const closeDialog = () => setIsDialogOpen(false)

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true)
    setDialogTitle('Error')
    setDialogMsg(msg)
  }

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
        <Dialog
          open={isDialogOpen}
          onClose={closeDialog}
        >
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            {!isLogoutSuccess
              ? <Button onClick={closeDialog}>Close</Button> : <></>
            }
          </DialogActions>
        </Dialog>
      </Box>
      <Button onClick={confirmButton} style={{ width: 100, marginTop: 10 }}>Confirm</Button>
    </>
  );
}
