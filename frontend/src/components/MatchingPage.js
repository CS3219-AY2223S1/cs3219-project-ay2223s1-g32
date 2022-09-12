import * as React from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { io } from "socket.io-client";

const socket = io("http://localhost:8001/", {
  autoConnect: false,
});

socket.on("connect", () => {
  console.log("Server successfully connected"); // false
});

socket.on("Success", (response) => {
  console.log(response); // false
});

socket.on("Error", (response) => {
  console.log(response); // false
});

socket.on("TimeoutError", (response) => {
  console.log(response); // false
});

export default function MatchingPage() {
  const [query, setQuery] = React.useState("idle");
  const timerRef = React.useRef();

  React.useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    []
  );

  const handleClickQuery = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (query !== "idle") {
      setQuery("idle");
      return;
    }
    var message = {
      username: "easy_user2",
      difficulty: "easy",
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
    </Box>
  );
}
