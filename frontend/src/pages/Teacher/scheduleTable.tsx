import React from "react";
import { formatDate } from "../../helper/scheduleHelper";
import TableComponent from "../../components/ui/table/TableComponent";
import TableHeadComponent from "../../components/ui/table/TableHeadComponent";
import TableRowComponent from "../../components/ui/table/TableRowComponent";

interface ScheduleEntry {
  room: string;
  day: string;
  subject: string;
  period: string;
}

interface ScheduleTableProps {
  scheduleData: any[];
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
                  (item) => item.room === room && item.day === day,
                );
                return (
                  <td key={day} className="px-4 py-2 text-center">
                    {entry ? `${entry.subject} (${entry.period})` : ""}
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
