import { useEffect, useState } from "react";
import { DateTimePicker, Grid, TextField, Button } from "../..";
import {
  adjustDateTimeForTimeZone,
  handleInputChange,
} from "../../../Utils/core";

const Diaper = ({ data, setData, translate }) => {
  useEffect(() => {
    setData({ ...data, action_type: 3 });
  }, []);
  return (
    <Grid container={true} spacing={2}>
      <Grid size={{ xs: 12 }}>
        <DateTimePicker
          value={
            data?.start_date
              ? adjustDateTimeForTimeZone(data?.start_date)
              : null
          }
          label={translate("data-hour-start")}
          name="start_date"
          fullWidth={true}
          ampm={false}
          format="DD/MM/YYYY HH:mm"
          onChange={(value) => {
            const dt = value ? new Date(value.toString()) : null;
            handleInputChange("start_date", dt, data, setData);
          }}
        />
      </Grid>
      <Grid size={{ xs: 12 }} sx={styles.button_container}>
        <Button
          sx={styles.button}
          variant="contained"
          color={data.type === 1 ? "secondary" : "primary"}
          onClick={() => {
            handleInputChange("type", 1, data, setData);
          }}
        >
          {translate("diaper-wet")}
        </Button>
        <Button
          sx={styles.button}
          variant="contained"
          color={data.type === 2 ? "secondary" : "primary"}
          onClick={() => {
            handleInputChange("type", 2, data, setData);
          }}
        >
          {translate("diaper-dirty")}
        </Button>
        <Button
          sx={styles.button}
          variant="contained"
          color={data.type === 3 ? "secondary" : "primary"}
          onClick={() => {
            handleInputChange("type", 3, data, setData);
          }}
        >
          {translate("diaper-both")}
        </Button>
        <Button
          sx={styles.button}
          variant="contained"
          color={data.type === 4 ? "secondary" : "primary"}
          onClick={() => {
            handleInputChange("type", 4, data, setData);
          }}
        >
          {translate("diaper-clean")}
        </Button>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          value={data?.observation ? data.observation : ""}
          label={translate("observation")}
          onChange={(event) => {
            handleInputChange("observation", event.target.value, data, setData);
          }}
          name="observation"
          rows={6}
          fullWidth={true}
          multiline={true}
        />
      </Grid>
    </Grid>
  );
};

const styles = {
  button: {
    flex: 1,
    minWidth: 120,
  },
  button_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
};

export default Diaper;
