import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "../..";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { IconButton, Box } from "../..";

const AppBarComponent = ({ ...props }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={styles.icon}
          onClick={() => navigate("/")}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={styles.main}>
          {props.title}
        </Typography>
        {props.id ? (
          <Box sx={styles.right}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={styles.icon}
              onClick={props._delete}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  icon: {
    position: "relative",
    zIndex: "2",
  },
  right: {
    display: "flex",
    position: "absolute",
    right: "1.5em",
  },
  main: {
    flexGrow: 1,
    textAlign: "center",
    position: "absolute",
    left: "0",
    width: "100%",
    zIndex: "1",
  },
};

export default AppBarComponent;
