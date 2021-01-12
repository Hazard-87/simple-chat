const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {cors: {origin: "*"}})

const cors = require('cors');
app.use(cors());

app.use(express.json())

const rooms = new Map();

app.get('/rooms', (req, res) => {
    res.json(rooms);
});

app.post('/rooms', (req, res) => {
    const {roomId, userName} = req.body
    if (!rooms.has(roomId)) {
        rooms.set(
            roomId,
            new Map([
                ['users', new Map()],
                ['messages', []]
            ])
        )
    }
    res.send()
});

io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', ({roomId, userName}) => {
        socket.join(roomId)
        rooms.get(roomId).get('users').set(socket.id, userName)
        const users = [...rooms.get(roomId).get('users').values()]
        socket.to(roomId).broadcast.emit('ROOM:JOINED', users)
    })

    console.log('user connected', socket.id);
});

http.listen(8080, () => {
    console.log(`listening on http://localhost:8080`);
});

