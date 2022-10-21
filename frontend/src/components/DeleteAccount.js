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
import { STATUS_CODE_FAILED } from "../constants";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteAccount() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogMsg, setDialogMsg] = useState("")
  const [username, setUsername] = useState("")
  const [isDeleteSuccessful, setIsDeleteSuccessful] = useState(false);
  const navigate = useNavigate() // re-direct api

  const handleDeletion = async () => {
    const userAuthToken = document.cookie.split('; ').find((row) => row.startsWith('authToken=')).split('=')[1];
    const res = await axios.delete(URL_USER_SVC, { 
      headers: {
        "Authorization": `Bearer ${userAuthToken}`
      },
      data: {
        username: username
      }
     }).catch((err) => {
        if (err.response.status === STATUS_CODE_FAILED || 500) {
          setErrorDialog("Error completing action");
        } else {
          setErrorDialog('Please try again later')
        }
      })
    if (res && res.status === 204) {
      setIsDeleteSuccessful(true);
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
            <Typography variant={"h4"}>Delete your account</Typography>
            <Typography variant={"h8"} marginBottom={"2rem"}>Confirm this by entering your username:</Typography>
            <TextField
                label="Username"
                variant="standard"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{marginBottom: "2rem"}}
            />
            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                <Button variant={"outlined"} onClick={handleDeletion}>Confirm</Button>
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
                    {isDeleteSuccessful
                        ? <Button onClick={navigate('/')}>Close</Button>
                        : <Button onClick={closeDialog}>Close</Button>
                    }
                </DialogActions>
            </Dialog>
        </Box>
    </React.Fragment>
  );
}
