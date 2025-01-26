import { Avatar, AvatarProps } from "@mui/material";

interface IAvatar extends AvatarProps {
  children?: React.ReactNode;
  props: any;
}

const AvatarComponent: React.FC<IAvatar> = ({ children, ...props }) => {
  return <Avatar {...props}>{children}</Avatar>;
};

export default AvatarComponent;
