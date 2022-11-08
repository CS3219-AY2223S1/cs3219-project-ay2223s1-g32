import * as React from 'react';
import {
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  Avatar,
  ListItemIcon,
  IconButton
} from "@mui/material";
import { LOGOUT_USER_SVC } from "../configs";
import { STATUS_CODE_FAILED, STATUS_CODE_SUCCESS } from "../constants";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { green } from '@mui/material/colors';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../useAuth";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogMsg, setDialogMsg] = useState("")
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);
  const navigate = useNavigate() // re-direct api
  const { authed, logout } = useAuth();

  const handleLogout = async () => {
    const userAuthToken = document.cookie.split('; ').find((row) => row.startsWith('authToken=')).split('=')[1];
    logout(userAuthToken)
      .then(res => {
        if (res && res.status === STATUS_CODE_SUCCESS) {
          setIsLogoutSuccess(true);
          navigate("/");
        } else if (res.status === STATUS_CODE_FAILED) {
          setErrorDialog(res.data.message);
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


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="medium"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ bgcolor: green[300], width: 56, height: 56 }}>
            <ManageAccountsIcon />
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider /> */}
        <MenuItem onClick={() => { navigate('/account/settings') }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Account Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
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
    </React.Fragment>
  );
}
