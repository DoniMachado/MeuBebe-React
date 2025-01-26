import { Alert, AlertProps } from "@mui/material";

interface IAlert extends AlertProps {
  children?: React.ReactNode;
  props: any;
}

const AlertComponent: React.FC<IAlert> = ({ children, ...props }) => {
  return <Alert {...props}>{children}</Alert>;
};

export default AlertComponent;
