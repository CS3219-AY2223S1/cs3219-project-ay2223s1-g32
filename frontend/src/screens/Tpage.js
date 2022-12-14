import { io } from "socket.io-client";
import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import TopNavBar from "../components/navBar/TopNavBar";
import ChatRoom from "../components/src/ChatRoom/ChatRoom";
import { Box, Button } from "@mui/material";
import { CodemirrorBinding } from "y-codemirror";
import { UnControlled as CodeMirrorEditor } from "react-codemirror2";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import "./Editor.css";
import RandomColor from "randomcolor";
import "./EditorAddons";
const socket = io("http://localhost:8001/", {
  autoConnect: true,
  withCredentials: true,
});

function Collab() {

  const [question, setQuestion] = React.useState("");
  const location = useLocation();
  const [isValidUser, setIsValidUser] = React.useState(false);
  const difficulty = location.state == null ? "" : location.state.difficulty;
  const roomID = location.state == null ? "" : location.state.roomID;
  const username =
    (document.cookie.split('; ').find((row) => row.startsWith('authToken=')) == null)
      ? ""
      : (document.cookie
        .split("; ")
        .find((row) => row.startsWith("username="))
        .split("=")[1]);
  const userId =
    (document.cookie.split('; ').find((row) => row.startsWith('authToken=')) == null)
      ? ""
      : document.cookie
        .split("; ")
        .find((row) => row.startsWith("userId="))
        .split("=")[1];
  const [EditorRef, setEditorRef] = React.useState(null);
  const [code, setCode] = React.useState("");
  socket.on("set question", (payload) => {
    console.log("TPAGE", JSON.stringify(payload));
    setQuestion(payload.question);
  });
  React.useEffect(() => {
    socket.emit("room", { roomID: roomID });
    axios
      .get(
        `http://localhost:8002/api/question/random/?difficulty=${difficulty}`
      )
      .then((resp) => {
        const q = resp.data;
        socket.emit("set question", { roomID, question: q });
      });

    if (document.cookie.split('; ').find((row) => row.startsWith('userAuthed=')) != 'false') {
      console.log("user authed is not false");
      console.log(JSON.stringify(document.cookie));
      setIsValidUser(true);
    };

    return () => {
      socket.emit("leave room", {
        roomID: roomID,
      });
    };
  }, []);

  const handleEditorDidMount = (editor) => {
    setEditorRef(editor);
  };
  React.useEffect(() => {
    if (EditorRef) {
      const ydoc = new Y.Doc(); //create a ydoc

      let provider = null;
      try {
        provider = new WebrtcProvider(roomID.toString(), ydoc, {
          //Remember the other tab or
          //other user should be in same room for seeing real-time changes
          signaling: [
            "wss://signaling.yjs.dev",
            "wss://y-webrtc-signaling-eu.herokuapp.com",
            "wss://y-webrtc-signaling-us.herokuapp.com",
          ],
        });

        const yText = ydoc.getText("codemirror");

        const yUndoManager = new Y.UndoManager(yText);

        const awareness = provider.awareness; //awareness is what makes other user aware about your actions

        const color = RandomColor(); //Provied any random color to be used for each user

        awareness.setLocalStateField("user", {
          name: username,
          color: color,
        });

        const getBinding = new CodemirrorBinding(yText, EditorRef, awareness, {
          yUndoManager,
        });
      } catch (err) {
        alert("error in collaborating try refreshing or come back later !");
      }
      return () => {
        if (provider) {
          provider.disconnect(); //We destroy doc we created and disconnect
          ydoc.destroy(); //the provider to stop propagting changes if user leaves editor
        }
      };
    }
  }, [EditorRef]);

  const onSubmitCode = () => {
    axios({
      method: "post",
      url: "http://localhost:8005/api/history/",
      data: {
        user: userId,
        question: question.name,
        content: code,
      },
    }).then(() => {
      window.alert("Submitted successfully!");
    });
  };

  if (!isValidUser) {
    return (
      <h1>Page not found</h1>
    );
  } else {
    return (
      <div>
        <TopNavBar />
        <h1>
          {"Difficulty:"} {difficulty}
        </h1>
        <h2>{question.name}</h2>
        <p>{question.content}</p>
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            fontSize: "20px",
            overflowY: "auto",
            marginTop: "20px",
          }}
        >
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
            <CodeMirrorEditor
              onChange={(editor, data, value) => {
                setCode(value);
              }}
              autoScroll
              options={{
                mode: "text/x-c++src", //this is for c++,  you can visit https://github.com/atharmohammad/Code-N-Collab/blob/master/src/Function/languageMapper.js  for other language types
                theme: "monokai",
                lineWrapping: true,
                smartIndent: true,
                lineNumbers: true,
                foldGutter: true,
                tabSize: 2,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                autoCloseTags: true,
                matchBrackets: true,
                autoCloseBrackets: true,
                extraKeys: {
                  "Ctrl-Space": "autocomplete",
                },
              }}
              editorDidMount={(editor) => {
                handleEditorDidMount(editor);
                editor.setSize("60vw", "40vw");
              }}
            />
            <ChatRoom roomid={roomID} username={username} />
          </Box>
        </div>
        <Box sx={{ marginTop: "30px" }}>
          <Button size="large" variant="contained" onClick={onSubmitCode}>
            Submit
          </Button>
        </Box>
      </div>
    );
  }
}
export default Collab;
