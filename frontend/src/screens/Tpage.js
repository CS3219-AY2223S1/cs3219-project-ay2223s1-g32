import { io } from "socket.io-client";
import React from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";

import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";

// const socket = io("http://localhost:3001/", {});
const socket = io("http://localhost:8001/", {});
const url = "mongodb://localhost:27017/mydb/";

function Collab() {
  const [code, setCode] = React.useState("");
  socket.on("receive code", (payload) => {
    setCode(payload);
  })
  const [question, setQuestion] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const difficulty = location.state.difficulty;

  React.useEffect(() => {
    socket.emit("room", { roomID: 1 });
    axios.get('http://localhost:8002/api/question/random')
    .then(resp => setQuestion(resp.data));

    return () => {
      socket.emit("leave room", {
        roomID: 1,
      });
    }
  })

  const codeIsHappening = (newCode) => {
    socket.emit("coding event", {
      code: newCode,
      roomID: 1,
    })
    setCode(newCode);
  };

  const options = {
    lineNumbers: true,
    mode: "javascript",
    theme: "monokai",
  };

  return (
    <>
    <TopNavBar  />
    <div>
      <h2>{'Difficulty:'} {difficulty}</h2>
      <h2>{question.name}</h2>
      <p>{question.content}</p>
      <CodeMirror
        value={code}
        options={options}
        height="200px"
        theme={dracula}
        onChange={codeIsHappening(code)}
        // onBeforeChange={(editor, data, value) => {
        //   this.setState({ value });
        // }}
        // onChange={(editor, data, value) => {}}
      />
    </div>
    </>
  );
}

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
