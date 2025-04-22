import {
  MdAssessment,
  MdCalendarMonth,
  MdGroup,
  MdNotifications,
  MdOutlineNoteAlt,
  MdPerson,
  MdSettings,
  MdSpaceDashboard,
} from "react-icons/md";

const iconClasses = "h-5 w-5";

export const icons = {
  dashboard: <MdSpaceDashboard className={iconClasses} />,
  userManagement: <MdPerson className={iconClasses} />,
  classManagement: <MdGroup className={iconClasses} />,
  scheduleManagement: <MdCalendarMonth className={iconClasses} />,
  reports: <MdAssessment className={iconClasses} />,
  settings: <MdSettings className={iconClasses} />,
  attendance: <MdOutlineNoteAlt className={iconClasses} />,
  notification: <MdNotifications className={iconClasses} />,
};
