import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import LoadingModal from "../../components/modal/LoadingModal";
import {
  countAttendanceStatus,
  processAttendanceData,
  processChartData,
} from "../../helper/attendanceHelper";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchAllClasses } from "../../store/slices/classReducer";
import { fetchAttendanceAll } from "../../store/slices/studentReducer";

const AttendanceStudent = () => {
  const dispatch = useAppDispatch();

  const { attendanceAll, loading } = useAppSelector((state) => state.student);
  const user = useAppSelector((state) => state.auth.user);
  const { classes } = useAppSelector((state) => state.class);

  useEffect(() => {
    dispatch(fetchAllClasses());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchAttendanceAll({ student_id: user.id }));
    }
  }, [dispatch, user]);

  const labelsMapping = ["present", "late", "excused_absence", "absent"];

  const processSeriesData = (
    statusCounts: Record<string, number>,
  ): number[] => {
    return labelsMapping.map((key) => statusCounts[key] || 0);
  };

  const [state, setState] = useState({
    series: [0, 0, 0, 0],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      colors: ["#28a745", "#ffc107", "#007bff", "#dc3545"],
      title: {
        text: "Thống kê điểm danh của sinh viên",
        align: "center",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          color: "#333",
        },
      },

      labels: ["Đi học", "Đi trễ", "Nghỉ có phép", "Nghỉ không phép"],
      legend: {
        position: "top",
        horizontalAlign: "center",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "top",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    if (
      attendanceAll &&
      Object.keys(attendanceAll.attendance_history).length > 0
    ) {
      const count = countAttendanceStatus(attendanceAll);
      const newSeries = processSeriesData(count.status_counts);
      setState((prevState) => ({
        ...prevState,
        series: newSeries,
      }));
    }
  }, [attendanceAll]);

  const status = processAttendanceData(attendanceAll);

  const [stateCol, setStateCol] = useState<{
    series: { name: string; data: number[] }[];
    options: any;
  }>({
    series: [],
    options: {
      chart: { type: "bar", height: 350 },
      colors: ["#28a745", "#ffc107", "#007bff", "#dc3545"],
      title: {
        text: "Thống kê điểm danh theo môn học",
        align: "center",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          color: "#333",
        },
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: "55%", borderRadius: 5 },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      xaxis: { categories: [] },
      yaxis: { title: { text: "Số lần điểm danh" } },
      fill: { opacity: 1 },
      tooltip: { y: { formatter: (val) => `${val} lần` } },
    },
  });

  useEffect(() => {
    console.log(attendanceAll, classes.length);
    if (attendanceAll && classes.length > 0) {
      const { statusCounts, categories } = processChartData(
        attendanceAll,
        classes,
      );
      console.log(categories);
      setStateCol({
        series: [
          { name: "Đi học", data: statusCounts.present || [] },
          { name: "Đi trễ", data: statusCounts.late || [] },
          { name: "Nghỉ có phép", data: statusCounts.excused_absence || [] },
          { name: "Nghỉ không phép", data: statusCounts.absent || [] },
        ],
        options: {
          ...stateCol.options,
          xaxis: { categories },
        },
      });
    }
    console.log(stateCol.series);
  }, [attendanceAll, classes]);

  return (
    <div>
      <div className="mt-6 grid h-1/2 max-w-6xl grid-cols-3 gap-4">
        <div className="col-span-1 h-full rounded-2xl bg-white px-2 py-6 shadow dark:bg-gray-700 dark:text-white">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="pie"
            width={380}
          />
        </div>

        <div className="col-span-2 h-full rounded-2xl bg-white shadow dark:bg-gray-700">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-indigo-300 text-xs text-gray-900 uppercase dark:bg-indigo-700 dark:text-gray-100">
              <tr>
                <th className="px-6 py-3">STT</th>
                <th className="px-6 py-3">Môn học</th>
                <th className="px-6 py-3 text-center">Đi học</th>
                <th className="px-6 py-3 text-center">Nghỉ có phép</th>
                <th className="px-6 py-3 text-center">Nghỉ không phép</th>
                <th className="px-6 py-3 text-center">Đi trễ</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(status).map(([classId, counts], index) => {
                const classData = classes.find((c) => c.id === Number(classId)); // 🔍 Tìm lớp có `id` tương ứng

                return (
                  <tr
                    key={index}
                    className="border-b bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      {classData?.subject_name || "Không có dữ liệu"}
                    </td>{" "}
                    <td className="px-6 py-4 text-center">{counts.present}</td>
                    <td className="px-6 py-4 text-center">
                      {counts.excused_absence}
                    </td>
                    <td className="px-6 py-4 text-center">{counts.absent}</td>
                    <td className="px-6 py-4 text-center">{counts.late}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-12">
            <ReactApexChart
              options={stateCol.options}
              series={stateCol.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </div>
      <LoadingModal isOpen={loading} />
    </div>
  );
};

export default AttendanceStudent;
