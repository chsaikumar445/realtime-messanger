import { useEffect, useState } from "react";
import "./App.css";
var W3CWebSocket = require("websocket").w3cwebsocket;

function App() {
  const [newMessage, setNewMessage] = useState([]);
  const [type, setType] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const client = new W3CWebSocket("ws://localhost:4000/");

    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = (message) => {
      console.log("message came");
      updateMessageList(message.data);
      console.log(message.data, "message");
    };
    client.onerror = function () {
      console.log("Connection Error");
    };

    setWs(client);
  }, [newMessage]);

  function sendMessageToback(msg) {
    if (ws) {
      ws.send(msg);
    }
  }

  function updateMessageList(msgtset) {
    let msgList = [...newMessage, msgtset];
    setNewMessage(msgList);
  }

  return (
    <div className="App">
      <div className="side-left"></div>
      <div className="side-right">
        <div className="header">
          <h1>{type}</h1>

          {newMessage.map((mes, index) => {
            return (
              <div key={index}>
                <h1>{mes}</h1>;
              </div>
            );
          })}
        </div>
        <div className="bottom-bar">
          <div className="inner-div">
            <input
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
            <button
              onClick={() => {
                sendMessageToback(type);
              }}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
