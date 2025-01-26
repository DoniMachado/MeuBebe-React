import { Checkbox, CheckboxProps } from "@mui/material";

interface ICheckbox extends CheckboxProps {
  props: any;
}

const CheckboxComponent: React.FC<ICheckbox> = (props) => {
  return <Checkbox {...props} />;
};

export default CheckboxComponent;
