"use client"
import { outfeedSocket, primeSocket } from "@/socket"
import React from "react"
import SocketStatus from "../components/SocketStatus/SocketStatus"
import AlertsSender from "../components/AlertsSender"
import { IAlertTypeOptions, IAnyAlertList, IUrgentAlert } from "../types/IAlert"
import AlertsShower from "../components/AlertsShower/AlertsShower"
import AlertPreset from "../components/AlertPreset/AlertPreset"

const Page: React.FC = () => {
   const [alerts, setAlerts] = React.useState<IAnyAlertList>([])
   const [otherAlerts, setOtherAlerts] = React.useState<IAnyAlertList>([])


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
            <h1 className="text-xl text-center">Alert Presets</h1>
            <div className="flex pl-2 overflow-x-scroll no-scrollbar">
               <AlertPreset socket={primeSocket}>
                  Outfeed line Down!!!
               </AlertPreset>
               <AlertPreset socket={primeSocket}>
                  Fouldown: Paint Splash!!!
               </AlertPreset>
               <AlertPreset socket={primeSocket}>
                  Fouldown: Paint missing
               </AlertPreset>
            </div>
         </div>
         <SocketStatus soket={outfeedSocket} />
      </>
   )
}
export default Page