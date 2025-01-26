import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "../../Components";
import { useAppContext } from "../../Context";
import logo from "../../Assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../Services/authentication.js";
import { useState } from "react";
import { handleChange } from "../../Utils/core.jsx";
import { validateEmail, validPassword } from "../../Utils/validators";
import { useTheme } from "@mui/material/styles";

const SignInView = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const { showAlert, supabase, translate } = useAppContext();
  const [data, setData] = useState({
    email: {
      value: "",
      error: null,
      helperText: null,
    },
    password: {
      value: "",
      error: null,
      helperText: null,
    },
  });

  const verifyLogin = async () => {
    const emailValidation = validateEmail(data.email.value);
    const passwordValidation = validPassword(data.password.value);

    setData((v) => ({
      ...v,
      email: {
        value: v.email.value,
        error: emailValidation.error,
        helperText: emailValidation.helperText,
      },
      password: {
        value: v.password.value,
        error: passwordValidation.error,
        helperText: passwordValidation.helperText,
      },
    }));

    if (emailValidation.error || passwordValidation.error) {
      return;
    }

    let { data: response, error } = await signIn(
      data.email.value,
      data.password.value,
      supabase
    );

    if (error) {
      if (error.message === "Invalid login credentials")
        showAlert(translate("invalid-credentials"), "error");
      else showAlert(error.message, "error");
    } else {
      localStorage.setItem("session", JSON.stringify(response.session));
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
    }
  };

  return (
    <Box>
      <Grid sx={styles.boxAdjustment} container={true}>
        <Grid sx={styles.centerBox} size={{ xs: 12 }}>
          <Avatar sx={styles.avatar} src={logo} />
        </Grid>
        <Grid
          sx={{
            ...styles.centerBox,
            ...styles.marginTop,
          }}
          size={{ xs: 12 }}
        >
          <Typography variant="h3" color="primary">
            {translate("login")}
          </Typography>
        </Grid>
        <Grid sx={styles.centerBox} size={{ xs: 12 }}>
          <Typography variant="h5" color="primary">
            {translate("welcome")}
          </Typography>
        </Grid>
        <Grid sx={styles.marginTop} size={{ xs: 12 }}>
          <TextField
            label={translate("email")}
            fullWidth={true}
            onChange={(event) =>
              handleChange(data, setData, event.target.value, "email")
            }
            value={data.email.value}
            error={data.email.error}
            helperText={translate(data.email.helperText)}
          />
        </Grid>
        <Grid sx={styles.marginTop} size={{ xs: 12 }}>
          <TextField
            label={translate("password")}
            fullWidth={true}
            onChange={(event) =>
              handleChange(data, setData, event.target.value, "password")
            }
            type="password"
            value={data.password.value}
            error={data.password.error}
            helperText={translate(data.password.helperText)}
          />
        </Grid>
        <Grid
          sx={{
            ...styles.centerBox,
            ...styles.marginTop,
          }}
          size={{ xs: 12 }}
        >
          <Link to="/signup">{translate("sign-up")}</Link>
        </Grid>
        <Grid sx={styles.marginTop} size={{ xs: 12 }}>
          <Button fullWidth={true} onClick={verifyLogin} variant="contained">
            {translate("sign-in")}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  centerBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boxAdjustment: {
    padding: 2,
  },
  marginTop: {
    marginTop: 4,
  },
  avatar: {
    width: 180,
    height: 180,
  },
  boxContainer: {
    minHeight: "100vh",
    paddingTop: 8,
  },
};

export default SignInView;
