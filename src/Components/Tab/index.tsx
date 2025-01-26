import { Tab, TabProps } from "@mui/material";

interface ITab extends TabProps {
  props: any;
}

const TabComponent: React.FC<ITab> = (props) => {
  return <Tab {...props} />;
};

export default TabComponent;
