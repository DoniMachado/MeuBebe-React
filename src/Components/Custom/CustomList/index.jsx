import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAppContext } from "../../../Context";
import { useNavigate } from "react-router-dom";
import {
  generateSubtitle,
  actionTypeStr,
  actionTypeColor,
  getIcon,
} from "../../../Utils/core.jsx";

const CustomList = ({ items, ...props }) => {
  const { translate } = useAppContext();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <List {...props}>
      {items.map((item, idx) => {
        const typeStr = actionTypeStr[item.action_type];
        const typeColor = actionTypeColor[item.action_type];

        return (
          <ListItem
            sx={{
              backgroundColor: theme.palette.secondary.main,
              borderRadius: "60px",
              marginTop: "1em",
            }}
            id={`new-item-list-${idx}`}
            key={idx}
            onClick={() => navigate(`/${item.action_type}/${item.id}`)}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: typeColor }}>
                {getIcon(item.action_type)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ color: typeColor, fontWeight: "bolder" }}
              primary={translate(typeStr)}
              secondary={generateSubtitle(item, translate)}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default CustomList;
