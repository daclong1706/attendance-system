import { Datepicker } from "flowbite-react";
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
import Human from "../../assets/Human.png";

const DashboardStudent = () => {
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
              width: 350,
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
    if (attendanceAll && classes.length > 0) {
      const { statusCounts, categories } = processChartData(
        attendanceAll,
        classes,
      );
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
  }, [attendanceAll, classes]);

  return (
    <div className="mx-auto mt-4 max-w-6xl p-4 md:block">
      <div className="overflow-x-auto">
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:items-start">
          <div className="col-span-2 mt-2 rounded-2xl bg-white shadow dark:bg-gray-700">
            <div className="block items-center justify-center md:flex">
              <div className="mx-12 my-6 text-left">
                <h1 className="mb-4 bg-gradient-to-r from-indigo-500 to-pink-600 bg-clip-text text-2xl font-extrabold text-transparent uppercase">
                  Chào mừng đến với Hệ thống điểm danh trực tuyến
                </h1>
                <p className="text-lg font-medium">
                  Quản lý hoạt động của trường một cách dễ dàng. Luôn cập nhật
                  về học tập, điểm danh, tài chính và nhiều hơn nữa tất cả trong
                  một nền tảng. Hãy cùng nhau tiếp tục xây dựng một tương lai
                  tươi sáng!
                </p>
              </div>
              <div>
                <img src={Human} alt="Human" />
              </div>
            </div>
          </div>

          <div>
            <Datepicker
              shadow
              showClearButton={false}
              showTodayButton={false}
              inline
            />
          </div>
        </div>
        <div className="mt-6 flex max-w-6xl flex-col gap-4 lg:flex-row">
          <div className="h-full rounded-2xl bg-white px-2 py-6 shadow dark:bg-gray-700 dark:text-white">
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="pie"
              width={380}
            />
          </div>

          <div className="mb-12 flex flex-col gap-2">
            <div className="rounded-2xl bg-white shadow dark:bg-gray-700">
              <table className="w-full rounded-2xl text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
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
                    const classData = classes.find(
                      (c) => c.id === Number(classId),
                    );

                    return (
                      <tr
                        key={index}
                        className="border-b bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">
                          {classData?.subject_name || "Không có dữ liệu"}
                        </td>{" "}
                        <td className="px-6 py-4 text-center">
                          {counts.present}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {counts.excused_absence}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {counts.absent}
                        </td>
                        <td className="px-6 py-4 text-center">{counts.late}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="rounded-2xl bg-white shadow dark:bg-gray-700">
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
    </div>
  );
};

export default DashboardStudent;
