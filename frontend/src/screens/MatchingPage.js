import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { io } from "socket.io-client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TopNavBar from '../components/navBar/TopNavBar.js';
import * as Components from "../components/selectDifficulty/Components";
import "../components/selectDifficulty/styles.css";

export default function MatchingPage() {
  const [query, setQuery] = React.useState("idle");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [dialogMsg, setDialogMsg] = React.useState("");
  const [dialogTitle, setDialogTitle] = React.useState("")
  const timerRef = React.useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [roomID, setRoomID] = React.useState(0);
  const difficulty = location.state == null ? "" : location.state.difficulty;

  const username = (document.cookie.split('; ').find((row) => row.startsWith('authToken=')) == null)
    ? ""
    : document.cookie.split('; ').find((row) => row.startsWith('username=')).split('=')[1];
  const [isValidUser, setIsValidUser] = React.useState(false);

  const socket = io("http://localhost:8001/", {
    autoConnect: false,
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Server successfully connected"); // false
  });

  socket.on("SuccessAdd", (response) => {
    console.log(response); // false
  });

  socket.on("SuccessMatched", (response, roomID) => {
    console.log(response); // false
    setRoomID(roomID);
    navigate("/matched", { state: { difficulty: difficulty, roomID: roomID } });
  });

  socket.on("Error", (response) => {
    console.log(response); // false
    setErrorDialog("Error finding match.")
  });

  socket.on("TimeoutError", (response) => {
    console.log(response); // false
    setErrorDialog("Please try again, it took too long :(")
  });

  React.useEffect(() =>
    () => {
      clearTimeout(timerRef.current);
    }, []);

  React.useEffect(() => {
    if (document.cookie.split('; ').find((row) => row.startsWith('userAuthed=')) != 'false') {
      console.log("user authed is not false");
      console.log(JSON.stringify(document.cookie));
      setIsValidUser(true);
    }
  }, []);

  const handleClickQuery = () => {
    console.log("username: " + username);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (query !== "idle") {
      setQuery("idle");
      return;
    }
    var message = {
      username: username,
      difficulty: difficulty,
    };
    setQuery("progress");
    socket.connect();
    socket.emit("match", message, (response) => {
      console.log("msg emitted");
      console.log(response);
    });

    timerRef.current = window.setTimeout(() => {
      setQuery("failed");
    }, 30000);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setQuery("failed");
  }

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true)
    setDialogTitle('Error')
    setDialogMsg(msg)
  }

  if (!isValidUser) {
    return (
      <h1>Page not found</h1>
    );
  } else {
    return (
      <>
        <TopNavBar />
        <Components.TinyContainer>
          <Box
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <Box sx={{ height: 40 }}>
              <Dialog
                open={isDialogOpen}
                onClose={closeDialog}
              >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                  <DialogContentText>{dialogMsg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeDialog}>Close</Button>
                </DialogActions>
              </Dialog>
              {query === "success" ? (
                <Typography>Success in finding you a coding comrade!</Typography>
              ) :
                query === "failed" ? (
                  <Typography>Failed this time in finding you a suitable comrade. Please try again!</Typography>
                ) : (
                  <Fade
                    in={query === "progress"}
                    style={{
                      transitionDelay: query === "progress" ? "800ms" : "0ms",
                    }}
                    unmountOnExit
                  >
                    <CircularProgress />
                  </Fade>
                )}
            </Box>
            <Components.MatchingButton onClick={handleClickQuery} sx={{ m: 2 }}>
              {query == "progress" ? "Stop Matching" : query == "failed" ? "Try Again" : "Start Matching"}
            </Components.MatchingButton>
            <div>
              <Box sx={{ height: 40 }}>
                <Link to="/selectdifficulty">
                  <Components.MatchingGhostButton>Change difficulty</Components.MatchingGhostButton>
                </Link>
              </Box>
            </div>
          </Box>
        </Components.TinyContainer>
      </>
    );
  };
}
