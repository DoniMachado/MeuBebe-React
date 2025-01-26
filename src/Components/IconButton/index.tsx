import { IconButton, IconButtonProps } from "@mui/material";

interface IIconButton extends IconButtonProps {
  props: any;
}

const IconButtonComponent: React.FC<IIconButton> = (props) => {
  return <IconButton {...props} />;
};

export default IconButtonComponent;
