import {
  DatePicker,
  PickerValidDate,
  DatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ptBR } from "@mui/x-date-pickers/locales";

interface IDatePicker extends DatePickerProps<PickerValidDate> {
  props?: any;
}

const DatePickerComponent: React.FC<IDatePicker> = ({ ...props }) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        ptBR.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <DemoContainer components={["DatePicker"]}>
        <DatePicker {...props} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
