import { PropsWithChildren } from "react";
import './Card.css';

interface CardProps {
  title? : string;
  className?: string;
}

const Card = ({children, title, className, ..._props}: PropsWithChildren<CardProps>)=>{
  return (
    <div className={["card", className].join(" ")}>
      {title && (<div className="cardTitle">{title}</div>)}
      {children}
    </div>
  )
}
export default Card;
