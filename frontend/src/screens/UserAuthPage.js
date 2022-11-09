import React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";
import * as Components from "../components/userAuth/Components";
import "../components/userAuth/styles.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { LOGIN_USER_SVC, URL_USER_SVC } from "../configs";
import { STATUS_CODE_FAILED, STATUS_CODE_SUCCESS, STATUS_CODE_CREATED } from "../constants";

function UserAuthPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMsg, setDialogMsg] = useState("");
    const [dialogTitle, setDialogTitle] = useState("")
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);
    const [isSignupSuccess, setIsSignupSuccess] = useState(false);
    const [signInMsg, setSignInMsg] = useState("Sign In");
    const [signIn, toggle] = React.useState(true);

    const navigate = useNavigate() // re-direct api
    const handleLogin = async (e) => {
      console.log("clicked");
      e.preventDefault();
        const res = await axios.post(LOGIN_USER_SVC, { username, password })
            .then(res => {
                console.log("res: " + JSON.stringify(res));
                if (res && res.status === STATUS_CODE_SUCCESS) {
                    // ref: https://stackoverflow.com/questions/29838539/how-to-store-access-token-value-in-javascript-cookie-and-pass-that-token-to-head
                    document.cookie = "authToken=" + res.data.token;
                    document.cookie = "username=" + res.data.username;
                    document.cookie = "userId=" + res.data.id;
                    setIsLoginSuccess(true);
                    console.log("Login success, navigating to /selectdifficulty")
                    navigate("/selectdifficulty");
                }
            }).catch((err) => {
                if (err.response.status === STATUS_CODE_FAILED) {
                    setErrorDialog(err.response.data.message);
                } else {
                    setErrorDialog('Please try again later')
                }
            })
    }

    const handleSignup = async (e) => {
      e.preventDefault();
      console.log("Signing up")
        setIsSignupSuccess(false)
        const res = await axios.post(URL_USER_SVC, { username, password })
            .catch((err) => {
                if (err.response.status === STATUS_CODE_FAILED) {
                    setErrorDialog(err.response.data.message);
                } else {
                    setErrorDialog('Please try again later');
                }
            })
        if (res && res.status === STATUS_CODE_CREATED) {
            setIsSignupSuccess(true)
        }
    };

    const closeDialog = () => setIsDialogOpen(false)

    const setErrorDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Error')
        setDialogMsg(msg)
    }

    return (
        <Components.Container>
            <Dialog
                open={isDialogOpen}
                onClose={closeDialog}
            >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMsg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {isLoginSuccess
                        ? <></> :
                        isSignupSuccess
                            ? <Button onClick={handleLogin}>Log in</Button>
                            : <Button onClick={closeDialog}>Close</Button>
                    }
                </DialogActions>
            </Dialog>
            <Components.SignUpContainer signingIn={signIn}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="username" />
                    <Components.Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Password" />
                    <Components.Button onClick={e => handleSignup(e)}>Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>
            <Components.SignInContainer signingIn={signIn}>
                <Components.Form>
                    <Components.Title>Sign in</Components.Title>
                    <Components.Input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="username" />
                    <Components.Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Password" />
                    <Components.Button onClick={e => handleLogin(e)}>Sign In</Components.Button>
                </Components.Form>
            </Components.SignInContainer>
            <Components.OverlayContainer signingIn={signIn}>
                <Components.Overlay signingIn={signIn}>
                    <Components.LeftOverlayPanel signingIn={signIn}>
                        <Components.Title>Welcome Back, comrade!</Components.Title>
                        <Components.Paragraph>
                            Please login with your exising account here
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>
                            Sign In Here!
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>
                    <Components.RightOverlayPanel signingIn={signIn}>
                        <Components.Title>Hello, comrade!</Components.Title>
                        <Components.Paragraph>
                            Simply choose a username to create an account and start your coding journey with us
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>
                            Sign Up Now!
                        </Components.GhostButton>
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
    );
}

export default UserAuthPage;
