import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object

export const primeSocket = io("http://localhost:3001/prime", {
   autoConnect: false
});

export const outfeedSocket = io("http://localhost:3001/outfeed", {
   autoConnect: false
});