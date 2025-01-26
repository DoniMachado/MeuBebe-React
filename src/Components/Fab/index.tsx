import { Fab, FabProps } from "@mui/material";

interface IFab extends FabProps {
  children?: React.ReactNode;
  props: any;
}

const FabComponent: React.FC<IFab> = ({ children, ...props }) => {
  return <Fab {...props}>{children}</Fab>;
};

export default FabComponent;
