import {
    Box,
    Button,
    Link,
    TextField,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { STATUS_CODE_FAILED, STATUS_CODE_SUCCESS } from "../constants";
import { useNavigate, useLocation } from "react-router-dom";
import * as React from "react";
import useAuth from "../useAuth";

function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMsg, setDialogMsg] = useState("")
    const [isLoginSuccess, setIsLoginSuccess] = useState(false)

    const redirect = useNavigate() // re-direct api

    const { login } = useAuth();
    const { state } = useLocation();

    const handleLogin = () => {
        login(username, password)
            .then(res => {
                if (res && res.status === STATUS_CODE_SUCCESS) {
                    // ref: https://stackoverflow.com/questions/29838539/how-to-store-access-token-value-in-javascript-cookie-and-pass-that-token-to-head
                    document.cookie = "authToken=" + res.data.token;
                    document.cookie = "username=" + res.data.username;
                    document.cookie = "userId=" + res.data.id;
                    setIsLoginSuccess(true)
                    redirect(state?.path || "/selectdifficulty");
                } else if (res.status === STATUS_CODE_FAILED) {
                    setErrorDialog(res.data.message);
                } else {
                    setErrorDialog('Please try again later')
                }
            });
    };

    const handleSignUpNav = async () => {
        redirect("/signup");
    }

    const closeDialog = () => setIsDialogOpen(false)

    const setErrorDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Error')
        setDialogMsg(msg)
    }

    return (
        <Box display={"flex"} flexDirection={"column"} width={"30%"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>Log In</Typography>
            <TextField
                label="Username"
                variant="standard"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ marginBottom: "1rem" }}
                autoFocus
            />
            <TextField
                label="Password"
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: "2rem" }}
            />
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} onClick={handleLogin}>Log In</Button>
            </Box>
            <Link underline="hover" justifyContent={"flex-start"}
                sx={{ marginTop: "-2.2rem" }}
                alignSelf={"flex-start"}
                onClick={handleSignUpNav}>
                {'No existing account? Sign up here.'}
            </Link>
            <Dialog
                open={isDialogOpen}
                onClose={closeDialog}
            >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMsg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {!isLoginSuccess
                        ? <Button onClick={closeDialog}>Close</Button> : <></>
                    }
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default LoginPage;
