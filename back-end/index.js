const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server, {
   cors: {
      origin: 'http://localhost:3000',
   }
});
const tt = [{
   text: "test urgent alert",
   id: 1,
   type: "urgent",
   date: new Date(),
   chacked: false,
   shown: false
},
{
   text: "test normal alert",
   id: 2,
   type: "normal",
   date: new Date(),
   chacked: false,
   shown: false
},
{
   text: "test keep-going alert",
   id: 3,
   type: "keep-going",
   date: new Date(),
   chacked: false,
   shown: false
}

]

let primeAlertsList = [...tt]
let outfeedAlertsList = [...tt]

const prime = io.of("/prime")
const outfeed = io.of("/outfeed")
const getSocketsAmount = () => {
   return prime.sockets.size + outfeed.sockets.size
}
// setInterval(() => { getSocketsAmount() }, 1000)
// //-----------prime------------
// const primeAlert = (socket, msg) => {
//    primeAlertsList.push(msg)
//    socket.emit("new-allert-c")

// }
const alertResponse = (io, updatedAlertList) => {
   io.emit("alertResponse", updatedAlertList)
}
prime.on('connection', (socket) => {
   prime.emit("status-change", getSocketsAmount())
   prime.emit("connected", primeAlertsList)

   socket.on("alert", (msg) => {
      primeAlertsList.unshift(msg)
      alertResponse(prime, primeAlertsList)
   })

   socket.on("removeAlert", (msg) => {
      const id = msg.id
      const newAlertsList = primeAlertsList.filter((alert) => alert.id !== id)
      primeAlertsList = newAlertsList
      alertResponse(prime, primeAlertsList)
   })

   socket.on('updateAlert', (updatedAlertId, updatedAlert) => {
      const newPrimeAlertsList = primeAlertsList.map((alert) => {
         if (updatedAlertId === alert.id) {
            return updatedAlert
         } else return alert
      })
      primeAlertsList = newPrimeAlertsList
      alertResponse(prime, primeAlertsList)
   })

   socket.on('disconnect', () => {
      console.log(`user ${socket.id} disc`);
      socket.disconnect()
      prime.emit("status-change", getSocketsAmount())
   })
});

//-----------outfeed------------
outfeed.on("connection", (socket) => {
   outfeed.emit("connected", outfeedAlertsList)
   outfeed.emit("status-change", getSocketsAmount())


   socket.on("alert", (msg) => {
      outfeedAlertsList.unshift(msg)
      alertResponse(outfeed, outfeedAlertsList)
   })

   socket.on("removeAlert", (msg) => {
      const id = msg.id
      const newAlertsList = outfeedAlertsList.filter((alert) => alert.id !== id)
      outfeedAlertsList = newAlertsList
      alertResponse(outfeed, outfeedAlertsList)
   })

   socket.on('updateAlert', (updatedAlertId, updatedAlert) => {
      const newOutfeedAlertsList = outfeedAlertsList.map((alert) => {
         if (updatedAlertId === alert.id) {
            return updatedAlert
         } else return alert
      })
      console.log(newOutfeedAlertsList)
      outfeedAlertsList = newOutfeedAlertsList
      alertResponse(outfeed, outfeedAlertsList)
   })

   socket.on('disconnect', () => {
      console.log(`user ${socket.id} disc`);
      socket.disconnect()
      outfeed.emit("status-change", getSocketsAmount())
   })
})

server.listen(3001, () => {
   console.log('listening on *:3001');
});
