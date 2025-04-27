import {
  MdAssessment,
  MdCalendarMonth,
  MdGroup,
  MdLibraryBooks,
  MdNotifications,
  MdOutlineNoteAlt,
  MdPerson,
  MdQrCode2,
  MdSettings,
  MdSpaceDashboard,
} from "react-icons/md";

export const getIcon = (
  IconComponent: React.ElementType,
  iconClasses: string = "h-5 w-5",
) => {
  return <IconComponent className={iconClasses} />;
};

export const icons = {
  dashboard: getIcon(MdSpaceDashboard),
  userManagement: getIcon(MdPerson),
  classManagement: getIcon(MdGroup),
  scheduleManagement: getIcon(MdCalendarMonth),
  reports: getIcon(MdAssessment),
  settings: getIcon(MdSettings),
  attendance: getIcon(MdOutlineNoteAlt),
  notification: getIcon(MdNotifications),
  qrcode: getIcon(MdQrCode2),
  subject: getIcon(MdLibraryBooks),
};
