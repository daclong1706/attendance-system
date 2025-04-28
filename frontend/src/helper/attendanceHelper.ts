import { AttendanceHistory } from "../types/attendanceTypes";
import { Class } from "../types/classType";

export const countAttendanceStatus = (attendanceHistory: AttendanceHistory) => {
  const statusCounts: Record<string, number> = {};
  let totalRecords = 0;

  Object.values(attendanceHistory.attendance_history).forEach((records) => {
    records.forEach((record) => {
      totalRecords++;
      statusCounts[record.attendance_status] =
        (statusCounts[record.attendance_status] || 0) + 1;
    });
  });

  return {
    student_id: attendanceHistory.student_id,
    total_records: totalRecords,
    status_counts: statusCounts,
  };
};

export const processAttendanceData = (attendanceAll: AttendanceHistory) => {
  const statusCounts: Record<number, Record<string, number>> = {};

  Object.entries(attendanceAll.attendance_history).forEach(
    ([classId, records]) => {
      statusCounts[Number(classId)] = {
        present: 0,
        excused_absence: 0,
        absent: 0,
        late: 0,
      };

      records.forEach((record) => {
        if (record.attendance_status !== "not_recorded") {
          statusCounts[Number(classId)][record.attendance_status] =
            (statusCounts[Number(classId)][record.attendance_status] || 0) + 1;
        }
      });
    },
  );

  return statusCounts;
};

export const processChartData = (
  attendanceAll: AttendanceHistory,
  classes: Class[],
) => {
  const statusTypes = ["present", "late", "excused_absence", "absent"];
  const statusCounts: Record<string, number[]> = {
    present: [],
    late: [],
    excused_absence: [],
    absent: [],
  };
  const categories: string[] = [];

  Object.entries(attendanceAll.attendance_history).forEach(
    ([classId, records]) => {
      const classData = classes.find((c) => c.id === Number(classId));
      if (!classData) return;

      categories.push(classData.subject_name);

      const countPerStatus = {
        present: 0,
        late: 0,
        excused_absence: 0,
        absent: 0,
      };

      records.forEach((record) => {
        if (record.attendance_status !== "not_recorded") {
          countPerStatus[record.attendance_status]++;
        }
      });

      statusTypes.forEach((status) => {
        statusCounts[status].push(countPerStatus[status]);
      });
    },
  );

  return { statusCounts, categories };
};
