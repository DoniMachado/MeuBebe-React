import { createContext, useContext, useState, useEffect } from "react";
import { SnackBar, Alert, Box, ConfirmationDialog } from "./Components";
import { useTranslation } from "react-i18next";
import { createClient } from "@supabase/supabase-js";
import { ThemeProvider, useMediaQuery } from "@mui/material";
import { lightTheme, darkTheme } from "./Utils/theme";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

//variaveis do .env para codesandbox
//process.env.VITE_SUPABASE_URL,
//process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const timeout = 5000;

  const { t: translate, i18n } = useTranslation();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [alertVariant, setAlertVariant] = useState("standard");
  const [language, setLanguage] = useState("");
  const [theme, setTheme] = useState("");
  const isBrowserDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogConfirmCallback, setDialogConfirmCallback] = useState(null);
  const [dialogCancelCallback, setDialogCancelCallback] = useState(null);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    const storedTheme = localStorage.getItem("theme");

    if (storedLanguage) {
      changeLanguage(storedLanguage);
    } else {
      const navLang = navigator.language.split("-")[0];
      changeLanguage(navLang);
    }

    if (storedTheme) {
      changeTheme(storedTheme);
    } else {
      changeTheme(isBrowserDarkMode ? "darkTheme" : "lightTheme");
    }
  }, []);

  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setLanguage(lang);
  }

  function changeTheme(them) {
    localStorage.setItem("theme", them);
    setTheme(them);
  }

  function showAlert(message, severity = "info", variant = "standard") {
    setAlertOpen(true);
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertVariant(variant);
  }
  function closeAlert() {
    setAlertOpen(false);
    setAlertMessage("");
    setAlertSeverity("info");
    setAlertVariant("standard");
  }

  function openDialog(title, message, confirmCallback, cancelCallback) {
    setDialogOpen(true);
    setDialogTitle(title);
    setDialogMessage(message);
    setDialogConfirmCallback(() => confirmCallback);
    setDialogCancelCallback(() => cancelCallback);
  }

  function closeDialog() {
    setDialogOpen(false);
    setDialogTitle("");
    setDialogMessage("");
    setDialogCancelCallback(null);
    setDialogConfirmCallback(null);
  }

  async function handleDialogConfirm() {
    if (dialogConfirmCallback) await dialogConfirmCallback();

    closeDialog();
  }

  async function handleDialogCancel() {
    if (dialogCancelCallback) await dialogCancelCallback();

    closeDialog();
  }

  const sharedState = {
    showAlert,
    closeAlert,
    changeLanguage,
    language,
    changeTheme,
    theme,
    translate,
    supabase,
    openDialog,
    closeDialog,
  };

  return (
    <ThemeProvider theme={theme === "darkTheme" ? darkTheme : lightTheme}>
      <AppContext.Provider value={sharedState}>
        {children}
        <SnackBar
          sx={{ minWidth: "90%" }}
          open={alertOpen}
          autoHideDuration={timeout}
          onClose={closeAlert}
        >
          <div style={{ width: "100%" }}>
            <Alert
              onClose={closeAlert}
              variant={alertVariant}
              severity={alertSeverity}
            >
              {" "}
              {alertMessage}
            </Alert>
          </div>
        </SnackBar>
        <ConfirmationDialog
          translate={translate}
          open={dialogOpen}
          title={dialogTitle}
          content={dialogMessage}
          handleConfirm={handleDialogConfirm}
          handleCancel={handleDialogCancel}
        />
      </AppContext.Provider>
    </ThemeProvider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context)
    throw new Exception(
      "AppContext inválido! Use-o em uma página que tenha acesso ao AppProvider."
    );

  return context;
};

export { useAppContext };
export default AppProvider;
