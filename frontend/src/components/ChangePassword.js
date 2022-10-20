import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  TextField,
  Box
} from "@mui/material";
import { URL_USER_SVC } from "../configs";
import { STATUS_CODE_FAILED, STATUS_CODE_SUCCESS } from "../constants";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogMsg, setDialogMsg] = useState("")
  const [isPasswordChangeSuccess, setIsPasswordChangeSuccess] = useState(false);
  const navigate = useNavigate() // re-direct api

  const handlePasswordChange = async () => {
    const userAuthToken = document.cookie.split('; ').find((row) => row.startsWith('authToken=')).split('=')[1];
    const username = document.cookie.split('; ').find((row) => row.startsWith('username=')).split('=')[1];
    const res = await axios.put(URL_USER_SVC, { 
      headers: {
        "Authorization": `Bearer ${userAuthToken}`
      },
      data: {
        username: username,
        newPassword: newPassword
      }
     }).catch((err) => {
        if (err.response.status === STATUS_CODE_FAILED) {
          setErrorDialog(err.response.data.message);
        } else {
          setErrorDialog('Please try again later')
        }
      })
    if (res && res.status === STATUS_CODE_SUCCESS) {
      setIsPasswordChangeSuccess(true);
    }
  }
  const closeDialog = () => setIsDialogOpen(false)

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true)
    setDialogTitle('Error')
    setDialogMsg(msg)
  }

  return (
    <React.Fragment>
     <Box 
     sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
     flexDirection={"column"} justifyContent={'center'} alignSelf={'center'}>
            <Typography variant={"h4"} marginBottom={"2rem"}>Change Password</Typography>
            <TextField
                label="New Password"
                variant="standard"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{marginBottom: "2rem"}}
            />
            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                <Button variant={"outlined"} onClick={handlePasswordChange}>Change Password</Button>
            </Box>
            <Dialog
                open={isDialogOpen}
                onClose={closeDialog}
            >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMsg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {isPasswordChangeSuccess
                        ? <Button onClick={navigate('/selectdifficulty')}>Go Back</Button>
                        : <Button onClick={closeDialog}>Close</Button>
                    }
                </DialogActions>
            </Dialog>
        </Box>
    </React.Fragment>
  );
}
