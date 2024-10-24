"use client"
import React from "react";
import { outfeedSocket, primeSocket } from "../../socket"
import SocketStatus from "../components/SocketStatus/SocketStatus";
import AlertsSender from "../components/AlertsSender";
import { IAlertType, IAlertTypeOptions, IAnyAlertList } from "../types/IAlert";
import AlertsShower from "../components/AlertsShower/AlertsShower";

const Test: React.FC = () => {

   const [alerts, setAlerts] = React.useState<IAnyAlertList>([]);
   const [otherAlerts, setOtherAlerts] = React.useState<IAnyAlertList>([])

   React.useEffect(() => {
      // no-op if the socket is already connected
      primeSocket.connect()
      outfeedSocket.connect()
      return () => {
         primeSocket.disconnect();
         outfeedSocket.disconnect()

      };
   }, []);


   React.useEffect(() => {
      const setAlertsHandler = (alerts: IAnyAlertList) => {
         setAlerts(alerts)
      }
      const setOtherAlertsHandler = (OtherAlerts: IAnyAlertList) => {
         setOtherAlerts(OtherAlerts)
      }
      primeSocket.on("connected", setAlertsHandler)
      primeSocket.on("alertResponse", setAlertsHandler)

      outfeedSocket.on("connected", setOtherAlertsHandler)
      outfeedSocket.on("alertResponse", setOtherAlertsHandler)

      return () => {
         primeSocket.off("connected", setAlertsHandler)
         primeSocket.off("alertResponse", setAlertsHandler)

         outfeedSocket.off("connected", setOtherAlertsHandler)
         outfeedSocket.off("alertResponse", setOtherAlertsHandler)
      }
   }, []);

   return (
      <>
         <h1 className="text-center text-black text-xl">Prime Alerts</h1>
         <AlertsShower otherAlerts={otherAlerts} alerts={alerts} socket={primeSocket} />
         <AlertsSender
            socket={outfeedSocket}
            title={<h1 className="text-center text-xl">An alert to <strong>The Outfeed line</strong></h1>}
         />
         <SocketStatus soket={primeSocket} />
      </>
   )
}
export default Test