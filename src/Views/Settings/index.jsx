import { Grid, Appbar, Tab, Tabs, TabPanel } from "../../Components";
import { useTheme } from "@mui/material/styles";
import { useAppContext } from "../../Context";
import { useEffect, useState } from "react";

import MainTab from "./tabs/main.jsx";
import GeneralTab from "./tabs/general.jsx";

const SettingsView = () => {
  const { translate, supabase } = useAppContext();
  const theme = useTheme();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container={true} sx={styles.boxStyle}>
      <Appbar title={translate("settings")} />
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        variant="fullWidth"
        centered
      >
        <Tab label={translate("profile")} value="1" sx={{ flex: 1 }} />
        <Tab label={translate("general-config")} value="2" sx={{ flex: 1 }} />
      </Tabs>

      <TabPanel value={value} index="1">
        <MainTab />
      </TabPanel>
      <TabPanel value={value} index="2">
        <GeneralTab />
      </TabPanel>
    </Grid>
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
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default SettingsView;
