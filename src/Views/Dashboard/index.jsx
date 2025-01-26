import {
  Button,
  Grid,
  Avatar,
  Box,
  Typography,
  CardNewItem,
  CustomList,
  Appbar,
} from "../../Components";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAppContext } from "../../Context";
import { useEffect, useState } from "react";
import { save, get } from "../../Services/supabase";

const DashboardView = () => {
  const { translate, supabase } = useAppContext();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Grid container={true}>
      <Appbar title={translate("dashboard")} />
    </Grid>
  );
};

export default DashboardView;
