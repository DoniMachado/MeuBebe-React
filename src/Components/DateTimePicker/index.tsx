import {
  DateTimePicker,
  PickerValidDate,
  DateTimePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ptBR } from "@mui/x-date-pickers/locales";

interface IDateTimePicker extends DateTimePickerProps<PickerValidDate> {
  props?: any;
}

const DateTimePickerComponent: React.FC<IDateTimePicker> = ({ ...props }) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        ptBR.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker {...props} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateTimePickerComponent;
