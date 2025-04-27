import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const AttendanceStudent = () => {
  const [state, setState] = useState({
    series: [44, 55, 13, 43],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Đi học", "Đi trễ", "Vắng có phép", "Vắng không phép"],
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

  return (
    <div>
      <div className="mt-6 grid h-1/2 grid-cols-3 gap-4">
        <div className="col-span-1 h-full rounded-2xl bg-white px-4 py-6 shadow dark:bg-gray-700 dark:text-white">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="pie"
            width={380}
          />
        </div>

        <div className="col-span-2 h-full rounded-2xl bg-white shadow dark:bg-gray-700">
          04
        </div>
      </div>
    </div>
  );
};

export default AttendanceStudent;
