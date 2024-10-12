import React, { useState, useEffect } from 'react';
import Logout from '../utils/Logout'

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [ws, setWs] = useState(null);

  const username = localStorage.getItem('username')
  const jwtToken = localStorage.getItem('jwt');


  useEffect(() => {
    const savedMessages = localStorage.getItem(`chatMessages_${username}`);
    if (savedMessages) {
      setChatMessages(JSON.parse(savedMessages))
    }
  }, [username])



  useEffect(() => {

    const socket = new WebSocket('ws://localhost:8080');
    setWs(socket);

    socket.onopen = () => {
      console.log('WebSocket connection established');
      const jwtToken = localStorage.getItem('jwt');
      socket.send(JSON.stringify({ type: 'auth', token: jwtToken }));
    };

    socket.onmessage = (event) => {
      const messageData = event.data.startsWith("Echo: ") ? event.data.slice(6) : event.data;
      try {
        const data = JSON.parse(messageData);
        if (data.type === 'message') {
          setChatMessages((prev) => {
            const newMessages = [...prev, { type: 'server', text: data.text }];
            localStorage.setItem(`chatMessages_${username}`, JSON.stringify(newMessages));
            return newMessages;
          });
        };
      } catch (error) {
        console.error("Error parsing message:", error);
        console.log("Raw message data:", messageData);
      }
    }
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, [username]);;

  const handleSendMessage = () => {
    if (ws && message.trim()) {
      const newMessages = [...chatMessages, { type: 'user', text: message }]
      setChatMessages(newMessages);
      localStorage.setItem(`chatMessages_${username}`, JSON.stringify(newMessages))
      ws.send(JSON.stringify({ type: 'message', text: message }));
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 relative">
      <div className="absolute top-4 right-4">
        <Logout />
      </div>

      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Chat with WebSocket</h1>

        <div className="mb-4 h-64 overflow-y-scroll border border-gray-300 rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Messages</h2>
          <ul className="space-y-2">
            {chatMessages.map((msg, index) => (
              <li
                key={index}
                className={`p-2 rounded-md max-w-xs ${msg.type === 'user' ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-black self-start mr-auto'
                  }`}
              >
                {msg.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here"
            className="flex-grow p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
