import { useEffect, useState } from "react";
import DropdownComponent from "../../components/ui/DropdownComponent";
import {
  generateAcademicYears,
  getSemesterDates,
  findCurrentWeek,
  getDefaultSemester,
} from "../../helper/scheduleHelper";
import ScheduleTable from "../../components/ui/table/ScheduleTable";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchScheduleByTeacher } from "../../store/slices/teacherReducer";
import LoadingModal from "../../components/modal/LoadingModal";

const Schedule = () => {
  // Xác định năm hiện tại và danh sách năm học
  const currentYear = new Date().getFullYear();
  const academicYears = generateAcademicYears(currentYear - 5, currentYear + 5);
  const defaultYear =
    academicYears.find((year) => year.includes(currentYear.toString())) ||
    academicYears[0];

  // Xác định học kỳ hiện tại
  const defaultSemester = getDefaultSemester();

  // Danh sách học kỳ
  const semesters = ["Học kỳ 1", "Học kỳ 2", "Học kỳ Hè"];

  // Khởi tạo state
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedSemester, setSelectedSemester] = useState(defaultSemester);
  const [weeks, setWeeks] = useState(
    getSemesterDates(selectedYear, selectedSemester),
  );
  const [selectedWeek, setSelectedWeek] = useState(findCurrentWeek(weeks));

  // Cập nhật tuần khi thay đổi năm học hoặc học kỳ
  useEffect(() => {
    const updatedWeeks = getSemesterDates(selectedYear, selectedSemester);
    setWeeks(updatedWeeks);
    setSelectedWeek(findCurrentWeek(updatedWeeks));
  }, [selectedYear, selectedSemester]);

  // Fetch dữ liệu từ Redux store
  const dispatch = useAppDispatch();
  const { schedule, loading, error } = useAppSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(fetchScheduleByTeacher());
  }, [dispatch]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="mt-4 flex flex-col">
      <div className="flex space-x-3">
        <DropdownComponent
          label="Năm học"
          options={academicYears}
          selected={selectedYear}
          onSelect={setSelectedYear}
        />
        <DropdownComponent
          label="Học kỳ"
          options={semesters}
          selected={selectedSemester}
          onSelect={setSelectedSemester}
        />
        <DropdownComponent
          label="Tuần"
          options={weeks}
          selected={selectedWeek}
          onSelect={setSelectedWeek}
        />
      </div>
      <ScheduleTable scheduleData={schedule} selectedWeek={selectedWeek} />
      <LoadingModal isOpen={loading} />
    </div>
  );
};

export default Schedule;
