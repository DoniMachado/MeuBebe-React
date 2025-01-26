import { Tabs, TabsProps } from "@mui/material";

interface ITabs extends TabsProps {
  children?: React.ReactNode;
  props: any;
}

const TabsComponent: React.FC<ITabs> = ({ children, ...props }) => {
  return <Tabs {...props}>{children}</Tabs>;
};

export default TabsComponent;
