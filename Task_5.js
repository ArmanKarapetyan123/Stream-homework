import express from 'express';
import {createServer} from 'http';
import { fileURLToPath } from 'url';
import {join , dirname} from 'path';
import {Server} from 'socket.io'

const app = express();
const server = createServer(app);
const io = new Server(server);

const _dirname = dirname(fileURLToPath(import.meta.url));
console.log(_dirname)
app.get('/', (req, res) => {
    res.sendFile(join(_dirname, 'index.html'));
})

io.on('connection',(socket) => {
    socket.on('chat message', (chatMessage) =>{
        console.log(chatMessage)
        io.emit('chat message'  , chatMessage)
    })

})

server.listen(3000 , () => {
    console.log('server running at http://localhost:3000');
})