
import constants from "./constants";
import keys from "../store/keys";
import session from "../store/session";
import io from 'socket.io-client';
import utils from "./utils";

var socket = null;

if (!socket) {
    socket = io(constants.SOCKET_SERVER, { transports: ['websocket'] });
    socket.on('connect', () => {
        // console.log("Socket.js = Connected to SocketIO Server.");
    });

    // socket.emit = (event, data) => {
    //     if (socket) {
    //         socket.emit(event, data);
    //     }
    // }
    
    // socket.on = (event, cb) => {
    //     if (socket) {
    //         socket.on(event, data => {
    //             cb(data);
    //         });
    //     }
    // }
}


export default socket;