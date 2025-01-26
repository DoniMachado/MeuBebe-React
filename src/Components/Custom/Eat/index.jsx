import { useEffect, useState } from "react";
import { DateTimePicker, Grid, TextField, Button } from "../..";
import {
  adjustDateTimeForTimeZone,
  handleInputChange,
} from "../../../Utils/core";

const Eat = ({ data, setData, translate }) => {
  useEffect(() => {
    setData({ ...data, action_type: 2 });
  }, []);

  return (
    <Grid container={true} spacing={2}>
      <Grid size={{ xs: 12 }} sx={styles.button_container}>
        <Button
          sx={styles.button}
          variant="contained"
          color={data.type === 1 ? "secondary" : "primary"}
          onClick={() => {
            handleInputChange("side", null, data, setData);
            handleInputChange("end_date", null, data, setData);
            handleInputChange("type", 1, data, setData);
          }}
        >
          {translate("eat-bottle")}
        </Button>
        <Button
          sx={styles.button}
          variant="contained"
          color={data.type === 2 ? "secondary" : "primary"}
          onClick={() => {
            handleInputChange("quantity", null, data, setData);
            handleInputChange("type", 2, data, setData);
          }}
        >
          {translate("eat-bosom")}
        </Button>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <DateTimePicker
          value={
            data?.start_date
              ? adjustDateTimeForTimeZone(data?.start_date)
              : null
          }
          label={
            data.type === 1
              ? translate("data-hour")
              : translate("data-hour-start")
          }
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
      {data.type === 2 ? (
        <Grid item={true} size={{ xs: 12 }}>
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
      ) : null}
      {data.type === 1 ? (
        <Grid size={{ xs: 12 }}>
          <TextField
            value={data?.quantity ? data.quantity : ""}
            label={translate("quantity") + " (ml)"}
            onChange={(event) => {
              handleInputChange("quantity", event.target.value, data, setData);
            }}
            name="quantity"
            type={"number"}
            fullWidth={true}
          />
        </Grid>
      ) : (
        <Grid size={{ xs: 12 }} sx={styles.button_container}>
          <Button
            sx={styles.button}
            variant="contained"
            color={data.side === 1 ? "secondary" : "primary"}
            onClick={() => {
              handleInputChange("side", 1, data, setData);
            }}
          >
            {translate("left")}
          </Button>
          <Button
            sx={styles.button}
            variant="contained"
            color={data.side === 2 ? "secondary" : "primary"}
            onClick={() => {
              handleInputChange("side", 2, data, setData);
            }}
          >
            {translate("right")}
          </Button>
          <Button
            sx={styles.button}
            variant="contained"
            color={data.side === 3 ? "secondary" : "primary"}
            onClick={() => {
              handleInputChange("side", 3, data, setData);
            }}
          >
            {translate("both")}
          </Button>
        </Grid>
      )}
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
export default Eat;
