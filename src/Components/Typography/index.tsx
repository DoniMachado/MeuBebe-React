import { Typography, TypographyProps } from "@mui/material";

interface ITypography extends TypographyProps {
  children?: React.ReactNode;
  // props: any;
}

const TypographyComponent: React.FC<ITypography> = ({ children, ...props }) => {
  return <Typography {...props}>{children}</Typography>;
};

export default TypographyComponent;
