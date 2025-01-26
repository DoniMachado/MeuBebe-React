import { Snackbar, SnackbarProps } from "@mui/material";

interface ISnackBar extends SnackbarProps {
  props: any;
  //children?: React.ReactElement<unknown, any>;
}

const SnackBarComponent: React.FC<ISnackBar> = ({ children, ...props }) => {
  return <Snackbar {...props}>{children}</Snackbar>;
};

export default SnackBarComponent;
