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
import { URL_USER_SVC } from "../../configs";
import { STATUS_CODE_FAILED } from "../../constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Components from "../common/Components";
import "../common/styles.css";

export default function DeleteAccount() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogMsg, setDialogMsg] = useState("")
  const [username, setUsername] = useState("")
  const [isDeleteSuccessful, setIsDeleteSuccessful] = useState(false);
  const navigate = useNavigate() // re-direct api

  const handleDeletion = async () => {
    const userAuthToken = document.cookie.split('; ').find((row) => row.startsWith('authToken=')).split('=')[1];
    const res = await fetch(URL_USER_SVC, {
      method: 'DELETE',
      body: JSON.stringify({
        username: username,
      }),
      headers: {
        'Authorization': `Bearer ${userAuthToken}`,
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res && res.status === 204) {
        setIsDeleteSuccessful(true);
        setSuccessDialog("Successfully changed your password!")
      }
    })
      .catch(err => {
        if (err.status === STATUS_CODE_FAILED || 500) {
          setErrorDialog("Error completing action");
        } else {
          setErrorDialog('Please try again later')
        }
      });
  }
  const closeDialog = () => setIsDialogOpen(false)

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true)
    setDialogTitle('Error')
    setDialogMsg(msg)
  }

  const setSuccessDialog = (msg) => {
    setIsDialogOpen(true)
    setDialogTitle('Success')
    setDialogMsg(msg)
  }

  return (
    <React.Fragment>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
        flexDirection={"column"} justifyContent={'center'} alignSelf={'center'}>
        <Components.AccountSettingsHeader>Delete your account</Components.AccountSettingsHeader>
        <Components.ASParagraph marginBottom={"2rem"}>Confirm this by entering your username:</Components.ASParagraph>
        <TextField
          label="Username"
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} >
          <Components.AccountSettingsButton onClick={handleDeletion}>Confirm</Components.AccountSettingsButton>
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
