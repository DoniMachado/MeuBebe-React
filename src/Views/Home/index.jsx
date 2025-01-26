import {
  Button,
  Grid,
  Avatar,
  Box,
  Typography,
  CardNewItem,
  CustomList,
} from "../../Components";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import baby from "../../Assets/img/baby.png";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "../../Constants/actions";
import { useAppContext } from "../../Context";
import { useEffect, useState } from "react";
import { list, get } from "../../Services/supabase";
import { calculateDuration } from "../../Utils/core";

const HomeView = () => {
  const { translate, supabase } = useAppContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState({});

  // const loadDataLocalStorage = () => {
  //   const itens = list();
  //   setData(itens);
  // };

  const loadData = async () => {
    const actions = await list("actions", supabase);
    if (actions) setData(actions);
  };

  const loadProfile = async () => {
    const prof = await get("profile", supabase);
    if (prof) setProfile(prof);
  };

  useEffect(() => {
    loadData();
    loadProfile();
  }, []);

  return (
    <Grid
      container={true}
      sx={{
        height: "100vh",
      }}
    >
      <Grid
        size={{ xs: 12 }}
        sx={{
          height: "30vh",
        }}
      >
        <Grid
          container={true}
          sx={{
            alignItems: "flex-end",
            margin: "1em",
          }}
        >
          <Grid
            size={{ xs: 4 }}
            sx={{
              ...styles.centerBox,
            }}
          >
            <IconButton
              onClick={() => navigate("/dashboard")}
              sx={{
                ...styles.iconButton,
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            >
              <SignalCellularAltIcon
                sx={{
                  ...styles.icon,
                  color: `${theme.palette.primary.main}`,
                }}
              />
            </IconButton>
            <Box sx={styles.boxText}>
              <Typography
                sx={{
                  ...styles.centerText,
                  ...styles.text2,
                }}
                component="p"
              >
                {profile?.height ?? "-"} {" cm"}
              </Typography>
              <Typography
                sx={{
                  ...styles.centerText,
                  ...styles.text3,
                }}
                component="p"
              >
                {translate("height")}
              </Typography>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 4 }}
            sx={{
              ...styles.centerBox,
            }}
          >
            <Avatar
              src={baby}
              sx={{
                width: 90,
                height: 90,
              }}
            />
            <Box sx={styles.boxText}>
              <Typography
                sx={{
                  ...styles.centerText,
                  ...styles.text1,
                }}
                component="p"
              >
                {profile?.name ?? "-"}
              </Typography>
              <Typography
                sx={{
                  ...styles.centerText,
                  ...styles.text3,
                }}
                component="p"
              >
                {profile?.birth ? calculateDuration(profile?.birth, "day") : 0}{" "}
                {translate("days")}
              </Typography>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 4 }}
            sx={{
              ...styles.centerBox,
            }}
          >
            <IconButton
              onClick={() => navigate("/settings")}
              sx={{
                ...styles.iconButton,
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            >
              <SettingsIcon
                sx={{
                  ...styles.icon,
                  color: `${theme.palette.primary.main}`,
                }}
              />
            </IconButton>
            <Box sx={styles.boxText}>
              <Typography
                sx={{
                  ...styles.centerText,
                  ...styles.text2,
                }}
                component="p"
              >
                {profile?.height ?? "-"} {" kg"}
              </Typography>
              <Typography
                sx={{
                  ...styles.centerText,
                  ...styles.text3,
                }}
                component="p"
              >
                {translate("weight")}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        size={{ xs: 12 }}
        sx={{
          height: "70vh",
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Grid
          container={true}
          sx={{
            marginTop: "-32px",
            padding: 2,
          }}
        >
          <Grid size={{ xs: 12 }}>
            <Grid container={true} spacing={2}>
              {ACTIONS.map((action, idx) => (
                <Grid size={{ xs: 4 }} key={idx}>
                  <CardNewItem
                    title={action.title}
                    Icon={action.Icon}
                    color={action.color}
                    actionType={action.actionType}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid
              container={true}
              sx={{
                marginTop: "1em",
              }}
            >
              <Grid size={{ xs: 12 }}>
                {data ? (
                  <CustomList
                    items={data}
                    sx={{
                      overflow: "auto",
                      maxHeight: "calc(70vh - 165px)",
                    }}
                  />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = {
  centerBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconButton: {
    height: "2.5em",
    width: "2.5em",
  },
  icon: {
    fontSize: "1.5em",
  },
  centerText: {
    textAlign: "center",
  },
  boxText: {
    marginTop: ".5em",
  },
  text1: {
    wordBreak: "break-all",
    fontSize: "1.2em",
    fontWeight: "500",
    fontFamily: '"Lato", sans-serif',
  },
  text2: {
    wordBreak: "break-all",
    fontSize: ".8em",
    fontWeight: "600",
    fontFamily: '"Lato", sans-serif',
  },
  text3: {
    wordBreak: "break-all",
    fontSize: ".8em",
    fontWeight: "400",
  },
};

export default HomeView;
