"use client"
import { outfeedSocket, primeSocket } from "@/socket"
import React from "react"
import SocketStatus from "../components/SocketStatus/SocketStatus"
import AlertsSender from "../components/AlertsSender"
import { IAlertTypeOptions, IAnyAlertList, IUrgentAlert } from "../types/IAlert"
import AlertsShower from "../components/AlertsShower"

const Page: React.FC = () => {
   const [alerts, setAlerts] = React.useState<IAnyAlertList>([])
   const sendNewUrgentAlert = (text: string) => {
      const date: Date = new Date()
      const newAlert: IUrgentAlert | IUrgentAlert = {
         text: text,
         id: crypto.randomUUID(),
         type: IAlertTypeOptions.urgent,
         date: date,
         checked: false,
         shown: false
      }
      primeSocket.emit("alert", newAlert)
   }

   React.useEffect(() => {
      primeSocket.connect()
      outfeedSocket.connect()
      return () => {
         primeSocket.disconnect()
         outfeedSocket.disconnect()
      }
   }, [])
   React.useEffect(() => {
      const setAlertsHandler = (alerts: IAnyAlertList) => {
         setAlerts(alerts)
      }

      outfeedSocket.on("connected", setAlertsHandler)
      outfeedSocket.on("alertResponse", setAlertsHandler)

      return () => {
         outfeedSocket.off("connected", setAlertsHandler)
         outfeedSocket.off("alertResponse", setAlertsHandler)
      }
   }, [])
   return (
      <>
         <div className="">
            <h1 className="text-center text-2xl">
               Outfeed Alerts
            </h1>
            <AlertsShower alerts={alerts} socket={outfeedSocket} />
            <AlertsSender
               socket={primeSocket}
               title={<h1 className="text-center text-xl">An alert to <strong> The Prime line</strong></h1>}
            />
            <h1 className="text-xl">Alert Presets</h1>
            <button
               className="uppercase p-4 bg-red-500 text-white font-bold"
               onClick={() => {
                  sendNewUrgentAlert("Outfeed line is down!!!")
               }}
            >Outfeed line is down</button>
         </div>
         <SocketStatus soket={outfeedSocket} />
      </>
   )
}
export default Page