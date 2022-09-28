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
import {useState} from "react";
import axios from "axios";
import {LOGIN_USER_SVC} from "../configs";
import {STATUS_CODE_FAILED, STATUS_CODE_LOGGEDIN} from "../constants";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMsg, setDialogMsg] = useState("")
    const [isLoginSuccess, setIsLoginSuccess] = useState(false)

    const redirect = useNavigate() // re-direct api

    const handleLogin = async () => {
        const res = await axios.post(LOGIN_USER_SVC, { username, password })
            .catch((err) => {
                if (err.response.status === STATUS_CODE_FAILED) {
                    setErrorDialog(err.response.data.message);
                } else {
                    setErrorDialog('Please try again later')
                }
            })
        if (res && res.status === STATUS_CODE_LOGGEDIN) {
            setIsLoginSuccess(true)
            redirect("/selectdifficulty");
        }
    }


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
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <TextField
                label="Password"
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{marginBottom: "2rem"}}
            />
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}> 
                <Button variant={"outlined"} onClick={handleLogin}>Log In</Button>
            </Box>
            <Link underline="hover" justifyContent={"flex-start"} 
            sx={{marginTop: "-2.2rem"}}
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
