import { Box } from "@mui/material";

interface ITabPanelComponent {
  children?: React.ReactNode;
  value: number;
  index: number;
  props: any;
}

const TabPanelComponent: React.FC<ITabPanelComponent> = ({
  children,
  value,
  index,
  ...props
}) => {
  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...props}
      style={{
        ...styles.boxStyle,
        display: value !== index ? "none" : "flex",
      }}
    >
      {value === index && <Box sx={styles.boxStyle}>{children}</Box>}
    </div>
  );
};

const styles = {
  boxStyle: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
};

export default TabPanelComponent;
