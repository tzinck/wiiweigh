import { Server } from "socket.io";
import { watch, readFileSync, createReadStream } from 'node:fs';
import { createServer } from 'node:http';
import express from 'express';

const app = express();
const server = createServer(app);
const io = new Server(server)


// read initial weight
let watchFile = './weight.txt';

if (process.argv.length > 2) {
    watchFile = process.argv[2];
}

let weight = readFileSync(watchFile, { encoding: 'utf8', flag: 'r' });


// webserver + sockets
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit("weight", weight);
});

server.listen(8080, () => {
    console.log('listening on *:80');
});


// fire off an event every time the file we're watching changes
watch(watchFile, { encoding: 'utf8' }, (eventType, filename) => {
    let w = readFileSync(watchFile, { encoding: 'utf8', flag: 'r' });
    if (w) {
        weight = w;
    }
    console.log(weight);

    io.emit("weight", weight);
});
