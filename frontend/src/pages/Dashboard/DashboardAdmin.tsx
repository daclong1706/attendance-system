import { Datepicker } from "flowbite-react";
import { useEffect, useState } from "react";
import authAPI from "../../api/authAPI";
import Human from "../../assets/Human.png";

const DashboardAdmin = () => {
  const [roleCounts, setRoleCounts] = useState<{
    admin: number;
    teacher: number;
    student: number;
  } | null>(null);

  useEffect(() => {
    async function getRoleData() {
      const data = await authAPI.fetchRoleCounts();
      console.log(data);
      if (data) setRoleCounts(data);
    }
    getRoleData();
  }, []);

  return (
    <div className="mx-auto mt-4 max-w-6xl p-4 md:block">
      <div className="overflow-x-auto">
        <div className="grid grid-flow-col grid-rows-3 gap-4">
          <div className="col-span-2 row-span-1 mt-2 rounded-2xl bg-white shadow dark:bg-gray-700">
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
          <div className="col-span-2 row-span-2">
            <div className="block items-center justify-center gap-4 md:flex">
              <div className="h-32 w-1/3 rounded-2xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 focus:outline-none dark:focus:ring-green-800">
                <h3 className="text-2xl font-light">Student</h3>
                <h1 className="mt-4 text-4xl font-semibold tracking-widest">
                  {roleCounts?.student}
                </h1>
              </div>
              <div className="h-32 w-1/3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-medium text-white hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 focus:outline-none dark:focus:ring-cyan-800">
                <h3 className="text-2xl font-light">Teacher</h3>
                <h1 className="mt-4 text-4xl font-semibold tracking-widest">
                  {roleCounts?.teacher}
                </h1>
              </div>
              <div className="h-32 w-1/3 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 px-6 py-3 text-left text-sm font-medium text-white hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 focus:outline-none dark:focus:ring-pink-800">
                <h3 className="text-2xl font-light">Manage</h3>
                <h1 className="mt-4 text-4xl font-semibold tracking-widest">
                  {roleCounts?.admin}
                </h1>
              </div>
            </div>
          </div>
          <div className="col-span-1 row-span-2">
            <Datepicker
              shadow
              showClearButton={false}
              showTodayButton={false}
              inline
            />
          </div>
          <div className="col-span-1 row-span-1"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
