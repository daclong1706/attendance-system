import { useEffect, useState } from "react";
import DropdownComponent from "../../components/ui/DropdownComponent";
import {
  generateAcademicYears,
  getSemesterDates,
} from "../../helper/scheduleHelper";
import ScheduleTable from "./scheduleTable";
import scheduleData from "../../assets/data/schedule";

const Schedule = () => {
  const academicYears = generateAcademicYears(2022, 2030);
  const semesters = ["Học kỳ 1", "Học kỳ 2", "Học kỳ Hè"];

  const [selectedYear, setSelectedYear] = useState(academicYears[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [weeks, setWeeks] = useState<string[]>(
    getSemesterDates(selectedYear, selectedSemester),
  );
  const [selectedWeek, setSelectedWeek] = useState(weeks[0]);

  useEffect(() => {
    const updatedWeeks = getSemesterDates(selectedYear, selectedSemester);
    setWeeks(updatedWeeks);
    setSelectedWeek(updatedWeeks[0]);
  }, [selectedYear, selectedSemester]);

  return (
    <div className="flex flex-col">
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
      <ScheduleTable scheduleData={scheduleData} selectedWeek={selectedWeek} />
    </div>
  );
};

export default Schedule;
