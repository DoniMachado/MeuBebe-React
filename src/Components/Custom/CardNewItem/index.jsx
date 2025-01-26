import { useNavigate } from "react-router-dom";
import { Box, Card, Fab, Typography } from "../..";
import AddIcon from "@mui/icons-material/Add";
import { useAppContext } from "../../../Context";
import { useTheme } from "@mui/material/styles";

const CardNewItem = ({ title, actionType, Icon, color }) => {
  const navigate = useNavigate();
  const { translate } = useAppContext();
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: "10%",
        overflow: "visible",
      }}
    >
      <Box sx={{ ...style.boxStyle }}>
        <Icon
          sx={{
            color: color,
            fontSize: "2.5em",
          }}
        />
        <Typography component="h3" color={color} sx={{ ...style.text1 }}>
          {translate(title)}
        </Typography>
      </Box>
      <Box sx={{ ...style.boxStyle }}>
        <Typography sx={{ ...style.text2 }}>
          {translate("add-record")}
        </Typography>
      </Box>
      <Box sx={{ ...style.boxStyle }}>
        <Fab
          onClick={() => {
            navigate(`new/${actionType}`);
          }}
          sx={{
            color: color,
            backgroundColor: "#fff",
            position: "relative",
            bottom: "-20px",
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Card>
  );
};

const style = {
  boxStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text1: {
    fontSize: "0.8em",
    fontWeight: "400",
    marginTop: "0.5em",
    width: "90%",
    wordWrap: "break-word",
    textAlign: "center",
  },
  text2: {
    fontSize: "0.8em",
    fontWeight: "400",
    marginTop: "0.5em",
    width: "90%",
    wordWrap: "break-word",
    textAlign: "center",
    color: "#8f8f8f",
  },
};

export default CardNewItem;
