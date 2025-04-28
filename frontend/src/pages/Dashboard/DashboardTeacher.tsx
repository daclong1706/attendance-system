import { Datepicker } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Human from "../../assets/Human.png";
import LoadingModal from "../../components/modal/LoadingModal";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchAllClassesByTeacher } from "../../store/slices/teacherReducer";

const DashboardTeacher = () => {
  const dispatch = useAppDispatch();

  const { classes, loading } = useAppSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(fetchAllClassesByTeacher());
  }, [dispatch]);
  const colors = ["#8E7DBE", "#9EC6F3", "#BDDDE4", "#FFF1D5"];

  const [state, setState] = useState<{
    series: { data: number[] }[];
    options: any;
  }>({
    series: [],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: colors,
            fontSize: "12px",
          },
        },
      },
    },
  });

  useEffect(() => {
    if (classes.length > 0) {
      const categories = classes.map((cls) => cls.subject_name);
      const series = classes.map((cls) => cls.student_count);

      setState({
        series: [
          {
            data: series,
          },
        ],
        options: {
          ...state.options,
          xaxis: { categories },
        },
      });
    }
    console.log(state.series);
  }, [classes]);

  return (
    <div className="mx-auto mt-4 max-w-6xl p-4 md:block">
      <div className="overflow-x-auto">
        <div className="grid grid-cols-3 gap-4">
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

          <div className="col-span-1">
            <Datepicker
              shadow
              showClearButton={false}
              showTodayButton={false}
              inline
            />
          </div>
          <div className="col-span-3 pr-16">
            <div className="w-full justify-center rounded-2xl bg-white shadow dark:bg-gray-700">
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="bar"
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
      <LoadingModal isOpen={loading} />
    </div>
  );
};

export default DashboardTeacher;
