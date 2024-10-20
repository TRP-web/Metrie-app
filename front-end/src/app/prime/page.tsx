"use client"
import React from "react";
import { outfeedSocket, primeSocket } from "../../socket"
import SocketStatus from "../components/SocketStatus/SocketStatus";
import AlertsSender from "../components/AlertsSender";
import { IAlertType, IAlertTypeOptions, IAnyAlertList } from "../types/IAlert";
import AlertsShower from "../components/AlertsShower";

const Test: React.FC = () => {

   const [alerts, setAlerts] = React.useState<IAnyAlertList>([]);

   const getStyleByType = (type: IAlertType): string => {
      switch (type) {
         case IAlertTypeOptions.urgent:
            return "bg-red-600"

         case IAlertTypeOptions.normal:
            return "bg-yellowcus"

         case IAlertTypeOptions.keepGoing:
            return "bg-gray-600"
      }
   }

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

      primeSocket.on("connected", setAlertsHandler)
      // primeSocket.on("alert-prime", testAlertHandler)

      primeSocket.on("alertResponse", setAlertsHandler)

      return () => {
         primeSocket.off("connected", setAlertsHandler)
         primeSocket.off("alertResponse", setAlertsHandler)
      }
   }, []);

   return (
      <>
         <h1 className="text-center text-black text-xl">Prime Alerts</h1>
         <AlertsShower alerts={alerts} socket={primeSocket} setAlerts={setAlerts}/>
         <AlertsSender
            socket={outfeedSocket}
            title={<h1 className="text-center text-xl">An alert to <strong>The Outfeed line</strong></h1>}
         />
         <SocketStatus soket={primeSocket} />
      </>
   )
}
export default Test