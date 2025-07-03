# WebRTC Video Chat

A simple peer-to-peer video chat application using WebRTC, Node.js, and Socket.IO.

## Features

- Real-time video chat
- Room-based conversations
- No registration required
- Works in modern browsers

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the server**
   ```bash
   node server.js
   ```

3. **Open browser**
   Navigate to `http://localhost:3000`

## Usage

1. Enter a room ID (e.g., "room123")
2. Click "Join Room"
3. Click "Start Video"
4. Share the room ID with others to connect

## Dependencies

- Express.js - Web server
- Socket.IO - Real-time signaling
- CORS - Cross-origin support
- openrelay - TURN server

## Browser Support

Works with Chrome, Firefox, Safari, and Edge (WebRTC compatible browsers).

## Configuration

Set environment variables:
```bash
PORT=3000          # Server port
HOST=0.0.0.0       # Server host
```

## Project Structure

```
├── public/index.html    # Frontend
├── server.js           # Backend server
├── package.json        # Dependencies
└── .gitignore         # Git ignore
```

## Troubleshooting

- Grant camera/microphone permissions
- Ensure both users are in the same room
- Check browser console for errors
- Use HTTPS in production
