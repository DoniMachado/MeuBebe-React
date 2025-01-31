import { Button, ButtonProps } from "@mui/material";

interface IButton extends ButtonProps {
  children?: React.ReactNode;
  props?: any;
  variant?: "text" | "contained" | "outlined";
  size?: "small" | "medium" | "large";
  className?: "";
}

const ButtonComponent: React.FC<IButton> = ({ children, ...props }) => {
  const { variant = "outlined", size = "large" } = props;

  return (
    <Button
      className={`general-button ${props.className ? props.className : ""}`}
      variant={variant}
      size={size}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
