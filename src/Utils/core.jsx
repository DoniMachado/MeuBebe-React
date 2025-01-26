import CribIcon from "@mui/icons-material/Crib";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import SpaIcon from "@mui/icons-material/Spa";

const handleChange = (data, setData, value, field) => {
  const d = data;
  d[field].value = value;
  setData(() => ({
    ...d,
  }));
};

import dayjs from "dayjs";

const adjustDateTimeForTimeZone = (dateString) => {
  if (!dateString) return dayjs();

  const dateUTC = dayjs.utc(dateString);
  const dateLocal = dateUTC.tz("America/Sao_Paulo");

  return dayjs(dateLocal.format());
};

const handleInputChange = (field, value, data, setData) => {
  setData((d) => {
    return { ...d, [field]: value };
  });
};

const subtitleSleep = (item, translate) => {
  return translate("subtitle-sleep")
    .replace(
      "{0}",
      adjustDateTimeForTimeZone(item.start_date).format("DD/MM/YYYY HH:mm")
    )
    .replace(
      "{1}",
      adjustDateTimeForTimeZone(item.end_date).format("DD/MM/YYYY HH:mm")
    );
};
const subtitleEat = (item, translate) => {
  return translate("subtitle-eat").replace(
    "{0}",
    adjustDateTimeForTimeZone(item.start_date).format("DD/MM/YYYY HH:mm")
  );
};
const subtitleDiaper = (item, translate) => {
  return translate("subtitle-diaper").replace(
    "{0}",
    adjustDateTimeForTimeZone(item.start_date).format("DD/MM/YYYY HH:mm")
  );
};

const generateSubtitle = (item, translate) => {
  switch (item.action_type) {
    case 1:
      return subtitleSleep(item, translate);
    case 2:
      return subtitleEat(item, translate);
    case 3:
      return subtitleDiaper(item, translate);
    default:
      return subtitleEat(item, translate);
  }
};

const actionTypeStr = {
  1: "sleep",
  2: "eat",
  3: "diaper",
};
const actionTypeColor = {
  1: "#4b10a9",
  2: "#47c869",
  3: "#f4cc1d",
};

const getIcon = (type) => {
  switch (type) {
    case 1:
      return <CribIcon />;
    case 2:
      return <RestaurantMenuIcon />;
    case 3:
      return <SpaIcon />;
    default:
      return <RestaurantMenuIcon />;
  }
};

const getUser = () => {
  const session = localStorage.getItem("session");

  return JSON.parse(session).user;
};

const calculateDuration = (startTimeStr, type) => {
  const startTime = dayjs.utc(startTimeStr);
  const endTime = dayjs().startOf("day");

  if (type === "day") {
    return dayjs.duration(endTime.diff(startTime)).asDays();
  } else if (type === "hour") {
    return dayjs.duration(endTime.diff(startTime)).asHours();
  } else {
    return dayjs.duration(endTime.diff(startTime)).asMinutes();
  }
};

export {
  handleChange,
  handleInputChange,
  adjustDateTimeForTimeZone,
  generateSubtitle,
  actionTypeStr,
  actionTypeColor,
  getIcon,
  getUser,
  calculateDuration,
};
