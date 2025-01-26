import {
  Button,
  Grid,
  DateTimePicker,
  TextField,
  Appbar,
} from "../../../Components";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAppContext } from "../../../Context";
import { useEffect, useState } from "react";
import { save, get } from "../../../Services/supabase";
import { adjustDateTimeForTimeZone, handleChange } from "../../../Utils/core";
import {
  validName,
  validWeight,
  validHeight,
  validBirth,
} from "../../../Utils/validators";

const MainTab = () => {
  const { translate, supabase, showAlert } = useAppContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const [profile, setProfile] = useState(null);
  const [data, setData] = useState({
    name: {
      value: "",
      error: null,
      helperText: null,
    },
    birth: {
      value: null,
      error: null,
      helperText: null,
    },
    weight: {
      value: null,
      error: null,
      helperText: null,
    },
    height: {
      value: null,
      error: null,
      helperText: null,
    },
  });

  const loadProfile = async () => {
    const prof = await get("profile", supabase);
    if (prof) setProfile(prof);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const saveProfile = async () => {
    debugger;
    const nameValidation = validName(data.name.value);
    const birthValidation = validBirth(data.birth.value);
    const weightValidation = validWeight(data.weight.value);
    const heightValidation = validHeight(data.height.value);

    setData((v) => ({
      ...v,
      name: {
        value: v.name.value,
        error: nameValidation.error,
        helperText: nameValidation.helperText,
      },
      birth: {
        value: v.birth.value,
        error: birthValidation.error,
        helperText: birthValidation.helperText,
      },
      weight: {
        value: v.weight.value,
        error: weightValidation.error,
        helperText: weightValidation.helperText,
      },
      height: {
        value: v.height.value,
        error: heightValidation.error,
        helperText: heightValidation.helperText,
      },
    }));

    if (
      nameValidation.error ||
      birthValidation.error ||
      weightValidation.error ||
      heightValidation.error
    ) {
      return;
    }

    const clone = { ...profile };

    clone.name = data.name.value;
    clone.birth = data.birth.value;
    clone.weight = data.weight.value;
    clone.height = data.height.value;

    try {
      await save("profile", supabase, clone);
      showAlert(translate("profile-success"), "success");
    } catch (error) {
      showAlert(translate("profile-error"), "error");
    }
  };

  const loadData = () => {
    if (profile) {
      setData((dt) => {
        const clone = { ...dt };

        clone.name.value = profile.name;
        clone.birth.value = profile.birth;
        clone.weight.value = profile.weight;
        clone.height.value = profile.height;

        return clone;
      });
    }
  };
  useEffect(() => {
    loadData();
  }, [profile]);

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
            <TextField
              placeholder={translate("name")}
              onChange={(event) => {
                handleChange(data, setData, event.target.value, "name");
              }}
              name="name"
              fullWidth={true}
              value={data.name.value}
              error={data.name.error}
              helperText={translate(data.name.helperText)}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <DateTimePicker
              value={
                data.birth.value
                  ? adjustDateTimeForTimeZone(data.birth.value)
                  : null
              }
              placeholder={translate("birth")}
              name="birth"
              fullWidth={true}
              ampm={false}
              slotProps={{
                textField: {
                  error: data.birth.error, // Bolean
                  helperText: translate(data.birth.helperText), // String
                },
              }}
              format="DD/MM/YYYY HH:mm"
              onChange={(value) => {
                const dt = value ? new Date(value.toString()) : null;
                handleChange(data, setData, dt, "birth");
              }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              placeholder={translate("weight")}
              onChange={(event) => {
                handleChange(data, setData, event.target.value, "weight");
              }}
              name="weight"
              fullWidth={true}
              value={data.weight.value}
              error={data.weight.error}
              helperText={translate(data.weight.helperText)}
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              placeholder={translate("height")}
              onChange={(event) => {
                handleChange(data, setData, event.target.value, "height");
              }}
              name="name"
              fullWidth={true}
              value={data.height.value}
              error={data.height.error}
              helperText={translate(data.height.helperText)}
              type="number"
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
              onClick={saveProfile}
            >
              {translate("save")}
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
};

export default MainTab;
