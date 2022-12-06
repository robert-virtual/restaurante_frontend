import { PropsWithChildren } from "react";
import "./Card.css";

interface CardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
}

const Card = ({
  children,
  title,
  className,
  ..._props
}: PropsWithChildren<CardProps>) => {
  return (
    <div {..._props} className={["card", className].join(" ")}>
      {title && <div className="cardTitle">{title}</div>}
      {children}
    </div>
  );
};
export default Card;
