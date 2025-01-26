import { Card, CardProps } from "@mui/material";

interface ICard extends CardProps {
  children?: React.ReactNode;
  props: any;
}

const CardComponent: React.FC<ICard> = ({ children, ...props }) => {
  return <Card {...props}>{children}</Card>;
};

export default CardComponent;
