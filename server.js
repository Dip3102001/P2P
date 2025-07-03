const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const http = require('http');
const twilio = require('twilio');

const app = express();

app.use(cors());

const server = http.createServer(app);

app.use(express.static('public'));

const configuration = {
    iceServers : [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            {
                urls: 'turn:openrelay.metered.ca:80',
                username: 'openrelayproject',
                credential: 'openrelayproject'
            }
    ],
    iceCandidatePoolSize: 10
};

app.get('/token', async (req, res) => {
    res.json(configuration);
});

const io = socketIO(server, {
    cors : {
        origin : "*",
        methods : ["GET", "POST"]
    }
});

const users = new Map();

io.on('connection', (socket)=>{
    
    // Join a room
    socket.on('join-room', (roomId, userId)=>{
        console.log('User connected:', socket.id);

        socket.join(roomId);
        users.set(socket.id, {
            userId, roomId
        });

        socket.to(roomId).emit('user-connected', {
            userId : userId,
            socketId : socket.id
        });
    });

    // Signaling: Offer
    socket.on('offer', (data)=>{
        console.log('offer:', socket.id);

        socket.to(data.target).emit('offer',{
            offer : data.offer,
            sender : socket.id
        });
    });

    // Signaling: Answer 
    socket.on('answer',(data)=>{
        console.log('answer:', socket.id);

        socket.to(data.target).emit('answer',{
            answer : data.answer,
            sender : socket.id
        });
    });

    // Signaling: ICE Candidate
    socket.on('ice-candidate', (data)=>{
        console.log("ice-candidate",data.target);
        socket.to(data.target).emit('ice-candidate',{
            candidate : data.candidate,
            sender : socket.id
        });
    });

    // Handle disconnection
    socket.on('user-disconnected',()=>{
        console.log("disconnected", socket.id);
        const user = users.get(socket.id);
        if(user){
            socket.to(user.roomId).emit('user-diconnected', user.userId);
            users.delete(socket.id);
        }
    });

});


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, ()=>{
    console.log(`Signaling server running on port ${PORT}`);
});