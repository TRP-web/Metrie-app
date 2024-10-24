"use client"
import { outfeedSocket, primeSocket } from "@/socket"
import React from "react"
import SocketStatus from "../components/SocketStatus/SocketStatus"
import AlertsSender from "../components/AlertsSender"
import { IAlertTypeOptions, IAnyAlertList, IUrgentAlert } from "../types/IAlert"
import AlertsShower from "../components/AlertsShower/AlertsShower"

const Page: React.FC = () => {
   const [alerts, setAlerts] = React.useState<IAnyAlertList>([])
   const [otherAlerts, setOtherAlerts] = React.useState<IAnyAlertList>([])
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
      const setOtherAlertsHandler = (OtherAlerts: IAnyAlertList) => {
         setOtherAlerts(OtherAlerts)
      }
      //from prime to outfeed
      outfeedSocket.on("connected", setAlertsHandler)
      outfeedSocket.on("alertResponse", setAlertsHandler)

      //from outfeed to prime
      primeSocket.on("connected", setOtherAlertsHandler)
      primeSocket.on("alertResponse", setOtherAlertsHandler)

      return () => {
         outfeedSocket.off("connected", setAlertsHandler)
         outfeedSocket.off("alertResponse", setAlertsHandler)

         primeSocket.off("connected", setOtherAlertsHandler)
         primeSocket.off("alertResponse", setOtherAlertsHandler)
      }
   }, [])
   return (
      <>
         <div className="">
            <h1 className="text-center text-2xl">
               Outfeed Alerts
            </h1>
            <AlertsShower alerts={alerts} socket={outfeedSocket} otherAlerts={otherAlerts} />
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