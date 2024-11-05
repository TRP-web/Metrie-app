import { io } from 'socket.io-client';
const appStatus = process.env.appStatus
const backEndUrl = process.env.backEndUrl
// "undefined" means the URL will be computed from the `window.location` object
const getUrl = (appStatus: string | undefined): string => {
   if (backEndUrl !== undefined) {
      if (appStatus === "prod") {
         return backEndUrl
      }
   }
   return "http://localhost:3001"
}


export const primeSocket = io(`${getUrl(appStatus)}/prime`, {
   autoConnect: false
});

export const outfeedSocket = io(`${getUrl(appStatus)}/outfeed`, {
   autoConnect: false
});