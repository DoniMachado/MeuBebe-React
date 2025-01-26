import { Box, BoxProps } from "@mui/material";

interface IBox extends BoxProps {
  children?: React.ReactNode;
  props: any;
}

const BoxComponent: React.FC<IBox> = ({ children, ...props }) => {
  return <Box {...props}>{children}</Box>;
};

export default BoxComponent;
