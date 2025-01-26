import { Switch, SwitchProps } from "@mui/material";

interface ISwitch extends SwitchProps {
  props: any;
}

const SwitchComponent: React.FC<ISwitch> = (props) => {
  return <Switch {...props} />;
};

export default SwitchComponent;
