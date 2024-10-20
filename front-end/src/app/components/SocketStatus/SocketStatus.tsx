import React from "react"
import { Socket } from "socket.io-client"

interface ISocketStatusProps {
   soket: Socket

}

const SocketStatus: React.FC<ISocketStatusProps> = ({ soket }) => {
   const [isConnected, setIsConnected] = React.useState<boolean>(false)
   const [usersAmount, setUsersAmount] = React.useState<string>("")
   React.useEffect(() => {
      setIsConnected(soket.active)
      const interval = setInterval(() => {
         setIsConnected(soket.active) // replace with server request
      }, 5000)

      const statusChange = (msg: string) => {
         setUsersAmount(msg)
      }
      soket.on("status-change", statusChange)

      return () => {
         clearInterval(interval)
         soket.off("status-change", statusChange)
      }
   }, [])
   return (
      <>
         <span>status: {
            isConnected ?
               <strong className="text-green-600">Connected</strong>
               : <strong className="text-red-600">Disconnected</strong>
         }
            {
               usersAmount !== "" ? ` (${usersAmount})` : ""
            }
         </span>
      </>
   )
}
export default SocketStatus