import { Container, ContainerProps } from "@mui/material";

interface IContainer extends ContainerProps {
  children?: React.ReactNode;
  props: any;
}

const ContainerComponent: React.FC<IContainer> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default ContainerComponent;
