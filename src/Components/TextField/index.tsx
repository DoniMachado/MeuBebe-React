import { TextField, TextFieldProps } from "@mui/material";

interface ITextField {
  variant?: "filled" | "outlined" | "standard";
  className?: "";
  mask?: string;
}

const TextFieldComponent: React.FC<ITextField> = (props) => {
  const { variant = "outlined" } = props;

  return (
    <TextField
      className={`general-textfield ${props.className ? props.className : ""}`}
      variant={variant}
      {...props}
    />
  );
};

export default TextFieldComponent;
