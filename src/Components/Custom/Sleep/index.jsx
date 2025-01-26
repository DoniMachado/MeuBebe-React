import { useEffect, useState } from "react";
import { DateTimePicker, Grid, TextField } from "../..";
import {
  adjustDateTimeForTimeZone,
  handleInputChange,
} from "../../../Utils/core";

const Sleep = ({ data, setData, translate }) => {
  useEffect(() => {
    setData({ ...data, action_type: 1 });
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
      <Grid size={{ xs: 12 }}>
        <DateTimePicker
          value={
            data?.end_date ? adjustDateTimeForTimeZone(data?.end_date) : null
          }
          label={translate("data-hour-end")}
          name="end_date"
          fullWidth={true}
          ampm={false}
          format="DD/MM/YYYY HH:mm"
          onChange={(value) => {
            const dt = value ? new Date(value.toString()) : null;
            handleInputChange("end_date", dt, data, setData);
          }}
        />
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

export default Sleep;
