import * as React from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { io } from "socket.io-client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TopNavBar from '../components/TopNavBar.js';

export default function MatchingPage() {
  const [query, setQuery] = React.useState("idle");
  const timerRef = React.useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [roomID, setRoomID] = React.useState(0);
  const difficulty = location.state.difficulty;
  const username = document.cookie.split('; ').find((row) => row.startsWith('username=')).split('=')[1];

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
    navigate("/matched", { state : { difficulty: difficulty, roomID: roomID }});
  });

  socket.on("Error", (response) => {
    console.log(response); // false
  });

  socket.on("TimeoutError", (response) => {
    console.log(response); // false
  });

  React.useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    []
  );

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
      setQuery("success");
    }, 30000);
  };

  return (
    <>
    <TopNavBar  />
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ height: 40 }}>
        {query === "success" ? (
          <Typography>Success!</Typography>
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
      <Button onClick={handleClickQuery} sx={{ m: 2 }}>
        {query !== "idle" ? "Stop Matching" : "Start Matching"}
      </Button>
      <div>
        <Box sx={{ height: 40 }}>
          <Link to="/login">
            <Button variant="outlined">Go Home</Button>
          </Link>
        </Box>
        <Box sx={{ height: 40 }}>
          <Link to="/selectdifficulty">
            <Button variant="outlined">Change difficulty</Button>
          </Link>
        </Box>
      </div>
    </Box>
    </>
  );
}
