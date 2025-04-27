import React from "react";
import { formatDate } from "../../../helper/scheduleHelper";
import TableComponent from "./TableComponent";
import TableHeadComponent from "./TableHeadComponent";
import TableRowComponent from "./TableRowComponent";
import { Schedule } from "../../../types/scheduleTypes";

interface ScheduleTableProps {
  scheduleData: Schedule[];
  selectedWeek: string;
}

const daysOfWeek = [1, 2, 3, 4, 5, 6, 0];

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  scheduleData,
  selectedWeek,
}) => {
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
  const validScheduleData = scheduleData.filter((entry) =>
    isWithinSelectedWeek(entry.start_date, entry.end_date, selectedWeek),
  );

  const rooms =
    validScheduleData.length > 0
      ? [...new Set(validScheduleData.map((entry) => entry.room))]
      : [];
  const startOfWeek = new Date(
    selectedWeek.split(" - ")[0].split("/").reverse().join("-"),
  );

  return (
    <div className="mt-4 overflow-x-auto">
      <TableComponent className="w-full border-separate rounded-2xl text-left text-sm text-gray-500 dark:text-gray-400">
        <TableHeadComponent className="text-center dark:bg-indigo-800">
          <TableRowComponent>
            <th className="px-4 py-2">Phòng</th>
            {daysOfWeek.map((day, index) => (
              <th key={index} className="px-4 py-2">
                {day === 0 ? "Chủ Nhật" : `Thứ ${day + 1}`} <br />
                {formatDate(
                  new Date(
                    startOfWeek.getTime() +
                      (day === 0 ? 6 : day - 1) * 24 * 60 * 60 * 1000,
                  ),
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
                      item.start_date,
                      item.end_date,
                      selectedWeek,
                    ),
                );
                return (
                  <td key={day} className="px-2 py-2">
                    {/* {entry ? `${entry.semester} (${entry.year})` : ""} */}
                    {entry ? (
                      <div className="mx-4 my-2 rounded-lg border-l-4 border-red-500 bg-white p-4 shadow-md">
                        <h3 className="text-lg font-semibold text-red-600">
                          {entry?.subject}
                        </h3>
                        <div className="mt-2 text-gray-700">
                          <p className="font-medium">
                            📍 Phòng:{" "}
                            <span className="text-black">{entry?.room}</span>
                          </p>
                          <p className="font-medium">
                            ⏳ Thời gian:{" "}
                            <span className="text-blue-500">
                              {entry.start_time}
                            </span>{" "}
                            -
                            <span className="text-blue-500">
                              {entry.end_time}
                            </span>
                          </p>
                          {entry.teacher_name && (
                            <div className="font-medium text-gray-700">
                              <p className="items-center space-x-2">
                                🎓 Giảng viên:{" "}
                                <span className="text-green-600">
                                  {entry.teacher_name}
                                </span>
                              </p>
                              <p className="text-sm font-normal text-green-500 italic">
                                ✉ {entry.teacher_email}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
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
