import React from "react";
import { formatDate } from "../../../helper/scheduleHelper";
import TableComponent from "./TableComponent";
import TableHeadComponent from "./TableHeadComponent";
import TableRowComponent from "./TableRowComponent";
import { Schedule } from "../../../types/scheduleTypes";

interface ScheduleEntry {
  room: string;
  day: string;
  subject: string;
  period: string;
}

interface ScheduleTableProps {
  scheduleData: Schedule[];
  selectedWeek: string;
}

const daysOfWeek = [
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
  "Chủ Nhật",
];

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  scheduleData,
  selectedWeek,
}) => {
  const rooms = [...new Set(scheduleData.map((entry) => entry.room))];
  const startOfWeek = new Date(
    selectedWeek.split(" - ")[0].split("/").reverse().join("-"),
  ); // Chuyển đổi chuỗi ngày thành Date
  const isWithinSelectedWeek = (
    startDate: string,
    endDate: string,
    selectedWeek: string,
  ) => {
    const weekStart = new Date(
      selectedWeek.split(" - ")[0].split("/").reverse().join("-"),
    );
    const weekEnd = new Date(
      selectedWeek.split(" - ")[1].split("/").reverse().join("-"),
    );

    const start = new Date(startDate.split("/").reverse().join("-"));
    const end = new Date(endDate.split("/").reverse().join("-"));

    return start <= weekEnd && end >= weekStart;
  };

  return (
    <div className="mt-4 overflow-x-auto">
      <TableComponent className="w-full border-separate rounded-2xl text-left text-sm text-gray-500 dark:text-gray-400">
        <TableHeadComponent className="text-center">
          <TableRowComponent>
            <th className="px-4 py-2">Phòng</th>
            {daysOfWeek.map((day, index) => (
              <th key={day} className="px-4 py-2">
                {day} <br />
                {formatDate(
                  new Date(startOfWeek.getTime() + index * 24 * 60 * 60 * 1000),
                )}
              </th>
            ))}
          </TableRowComponent>
        </TableHeadComponent>
        <tbody>
          {rooms.map((room) => (
            <tr key={room} className="bg-indigo-100">
              <td className="px-4 py-2 font-semibold">{room}</td>
              {daysOfWeek.map((day) => {
                const entry = scheduleData.find(
                  (item) =>
                    item.room === room &&
                    item.day_of_week === day &&
                    isWithinSelectedWeek(
                      item.start_time,
                      item.end_time,
                      selectedWeek,
                    ),
                );
                return (
                  <td key={day} className="px-4 py-2 text-center">
                    {entry ? `${entry.semester} (${entry.year})` : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </TableComponent>
    </div>
  );
};

export default ScheduleTable;
