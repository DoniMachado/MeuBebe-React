import { Grid2 as Grid, Grid2Props as GridProps } from "@mui/material";

interface IGrid extends GridProps {
  children?: React.ReactNode;
  // props: any;
}

const GridComponent: React.FC<IGrid> = ({ children, ...props }) => {
  return <Grid {...props}>{children}</Grid>;
};

export default GridComponent;
