import React from "react"
interface IButtonProps {
   children: string
   className?: string
   onClick?: () => void
}
const Button: React.FC<IButtonProps> = (props) => {
   return <button {...props}></button>
}
export default React.memo(Button) 