import { Button, Grid } from "../../../Components";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useAppContext } from "../../../Context";
import { useEffect, useState } from "react";
import { signOut } from "../../../Services/authentication";
import { InputLabel, MenuItem, Select, Switch } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

const GeneralTab = () => {
  const {
    translate,
    supabase,
    changeLanguage,
    language,
    changeTheme,
    theme: them,
  } = useAppContext();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChangeTheme = (event) => {
    changeTheme(event.target.checked ? "lightTheme" : "darkTheme");
  };

  return (
    <Grid container={true} sx={styles.boxStyle}>
      <Grid
        size={{ xs: 12 }}
        sx={{
          ...styles.boxStyle,
          marginTop: "1em",
          padding: "1em",
          justifyContent: "space-between",
        }}
      >
        <Grid
          container={true}
          sx={{
            ...styles.boxStyle,
            justifyContent: "space-evenly",
            flex: 2,
          }}
        >
          <Grid size={{ xs: 12 }}>
            <InputLabel id="language-select-label">
              {translate("language")}
            </InputLabel>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={language}
              onChange={(event) => changeLanguage(event.target.value)}
              label={translate("language")}
              fullWidth
            >
              <MenuItem value={"pt"}>{translate("portugues")}</MenuItem>
              <MenuItem value={"en"}>{translate("english")}</MenuItem>
              <MenuItem value={"es"}>{translate("spanish")}</MenuItem>
            </Select>{" "}
          </Grid>
          <Grid size={{ xs: 12 }} sx={styles.centerRow}>
            <Switch
              checked={them === "lightTheme" ? true : false}
              size="large"
              icon={<DarkMode />}
              checkedIcon={<LightMode />}
              color="primary"
              onChange={handleChangeTheme}
            />
          </Grid>
        </Grid>
        <Grid
          container={true}
          sx={{
            ...styles.boxStyle,
            justifyContent: "flex-end",
          }}
        >
          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              onClick={async () => {
                await signOut(supabase, navigate);
              }}
            >
              {translate("logout")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
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
  centerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default GeneralTab;
