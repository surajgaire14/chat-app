import React from "react";
import { useLocation } from "react-router-dom";
import style from "styled-components";
import queryString from "query-string";
import useChat from "../UseChat";

const Container = style.div`
height:100vh;
width:100vw;
display:flex;
overflow:hidden;
`;
const SideBar = style.div`
height:100vh;
width:15%;
border-right:1px solid black;
padding:0 8px;
text-align:center;
`;

const ChatPanel = style.div`
  height: 100;
  width: 85%;
  display: flex;
  flex-direction: column;
  padding:5px;
`;

const ChatContainer = style.div.attrs({
  className: "",
})`
  width: 100%;
  height: 95%;
  overflow: scroll;
  border-bottom: 1px solid black;
`;

const ButtonArea = style.div`
  width:100%;
  height:5%;
  display:flex;
  gap:10px;
  justify-content:space-around;
  align-items:center;
  padding:5px;
`;
const Input = style.input`
  &:focus{
    outline:none;
  }
  width:100%;
  height:100%;
  padding:5px 0;
  font-size:1.1rem;
`;

const Button = style.button`
  width:100px;
  height:40px;
  cursor:pointer;
`;

function Chat() {
  const [message, setMessage] = React.useState("");
  const location = useLocation();
  const data = queryString.parse(location.search);
  const { room, username } = data;
  const { messages, sendMessage, users } = useChat(room, username);
  console.log(users)
  

  let filterUser = users.filter((user, i) => {
    return user !== null && users.indexOf(user) === i;
  });

  console.log(filterUser)

  const handleSendMessage = () => {
    if (message !== "") {
      sendMessage(message, username);
      setMessage("");
    }
  };

  return (
    <Container>
      <SideBar>
        <h3>Room</h3>
        <p style={{ textAlign: "left" }}>Room:{room}</p>
        <h3>Users</h3>
        {filterUser.map((user, i) => {
          return (
            <p key={i} style={{ textAlign: "left" }}>
              {user}
            </p>
          );
        })}
      </SideBar>
      <ChatPanel>
        <ChatContainer>
          {messages.map((message, i) => {
            return (
              <div key={i} className="message__container">
                {
                  <p
                    className={`message-item ${
                      message.ownedByCurrentUser
                        ? "myMessage"
                        : "receivedMessage"
                    }`}
                  >
                    {message.sender},{message.time}
                  </p>
                }
                <p
                  className={`message-item ${
                    message.ownedByCurrentUser
                      ? "my-message"
                      : "received-message"
                  }`}
                >
                  {message.body}
                </p>
              </div>
            );
          })}
        </ChatContainer>
        <ButtonArea>
          <Input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Aa"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </ButtonArea>
      </ChatPanel>
    </Container>
  );
}

export default Chat;
