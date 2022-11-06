import { io } from "socket.io-client";
import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";

// import CodeMirror from "@uiw/react-codemirror";
// import { dracula } from "@uiw/codemirror-theme-dracula";
import { CodemirrorBinding } from "y-codemirror";
import { UnControlled as CodeMirrorEditor } from "react-codemirror2";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import "./Editor.css";
import RandomColor from "randomcolor";
import "./EditorAddons";
// const socket = io("http://localhost:3001/", {});
const socket = io("http://localhost:3001/", {
  autoConnect: true,
  withCredentials: true,
});

function Collab() {
  socket.on("receive code", (payload) => {
    console.log(JSON.stringify(payload));
    setCode(payload.code);
  });
  const [question, setQuestion] = React.useState("");
  const difficulty = "location.state.difficulty";
  const [EditorRef, setEditorRef] = React.useState(null);
  const [code, setCode] = React.useState("");
  React.useEffect(() => {
    socket.emit("room", { roomID: 1 });
    axios
      .get("http://localhost:8002/api/question/")
      .then((resp) => setQuestion(resp.data[1]));

    return () => {
      socket.emit("leave room", {
        roomID: 1,
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
        provider = new WebrtcProvider("Any Room Name", ydoc, {
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
          name: "Users Name",
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

  {
    /* <CodeMirror
          value={code}
          options={options}
          height="200px"
          theme={dracula}
          onChange={(code) => codeIsHappening(code)}
        /> */
  }

  return (
    <div>
      <TopNavBar />
      <h2>
        {"Difficulty:"} {difficulty}
      </h2>
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          fontSize: "20px",
          overflowY: "auto",
        }}
      >
        <h2>{question.name}</h2>
        <p>{question.content}</p>
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
            editor.setSize("100vw", "50vw");
          }}
        />
      </div>{" "}
    </div>
  );
}
// function Collab() {
//   const [code, setCode] = React.useState("");
//   socket.on("receive code", (payload) => {
//     console.log(JSON.stringify(payload));
//     setCode(payload.code);
//   });
//   const [question, setQuestion] = React.useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const difficulty = "location.state.difficulty";

//   React.useEffect(() => {
//     socket.emit("room", { roomID: 1 });
//     axios
//       .get("http://localhost:8002/api/question/")
//       .then((resp) => setQuestion(resp.data[1]));

//     return () => {
//       socket.emit("leave room", {
//         roomID: 1,
//       });
//     };
//   }, []);

//   const codeIsHappening = (newCode) => {
//     socket.emit("coding event", {
//       code: newCode,
//       roomID: 1,
//     });
//     setCode(newCode);
//   };

//   const options = {
//     lineNumbers: true,
//     mode: "javascript",
//     theme: "monokai",
//   };

//   return (
// <>
//   <TopNavBar />
//   <div>
//     <h2>
//       {"Difficulty:"} {difficulty}
//     </h2>
//     <h2>{question.name}</h2>
//     <p>{question.content}</p>
//     <div id="editor"></div>
//     <script type="text/javascript" src="../dist/demo.js" async></script>
//     {/* <CodeMirror
//       value={code}
//       options={options}
//       height="200px"
//       theme={dracula}
//       onChange={(code) => codeIsHappening(code)}
//     /> */}
//   </div>
// </>
//   );
// }

// class Collab extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { code: "" };
//     socket.on("receive code", (payload) => {
//       this.updateCodeInState(payload);
//     });

//     const navigate = useNavigate();
//     const location = useLocation();
//     const question = location.state.question;

//   }

//   updateCodeInState(payload) {
//     console.log(payload.code);
//     this.setState({ code: payload.code });
//   }

//   codeIsHappening(newCode) {
//     socket.emit("coding event", {
//       code: newCode,
//       roomID: 1,
//     });
//   }

//   componentDidMount() {
//     socket.emit("room", { roomID: 1 });
//   }
//   // componentWillReceiveProps(nextProps) {
//   //   socket.emit("room", { roomID: 1 });
//   // }

//   componentWillUnmount() {
//     socket.emit("leave room", {
//       roomID: 1,
//     });
//   }

//   render() {
//     const options = {
//       lineNumbers: true,
//       mode: "javascript",
//       theme: "monokai",
//     };
//     return (
//       <>
//       <div>
//         <h1>{"Title"}</h1>
//         <p>{"Description"}</p>
//         <CodeMirror
//           value={this.state.code}
//           options={options}
//           height="200px"
//           theme={dracula}
//           onChange={this.codeIsHappening.bind(this)}
//           // onBeforeChange={(editor, data, value) => {
//           //   this.setState({ value });
//           // }}
//           // onChange={(editor, data, value) => {}}
//         />
//       </div>
//       <div>
//         <h1>Question: {this.question}</h1>
//       </div>
//       </>
//     );
//   }
// }

export default Collab;
