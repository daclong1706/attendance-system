export const generateAcademicYears = (startYear: number, endYear: number) => {
  const years = [];
  for (let year = startYear; year < endYear; year++) {
    years.push(`${year}-${year + 1}`);
  }
  return years;
};

export const getFirstMonday = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  while (date.getDay() !== 1) {
    date.setDate(date.getDate() + 1);
  }
  return date;
};

export const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const generateWeeks = (startDate: Date, endDate: Date) => {
  const weeks = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const startOfWeek = new Date(current);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    weeks.push(`${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`);
    current.setDate(current.getDate() + 7);
  }

  return weeks;
};

export const getSemesterDates = (academicYear: string, semester: string) => {
  const [startYear, endYear] = academicYear.split("-").map(Number);

  let startDate, endDate;

  switch (semester) {
    case "Học kỳ 1":
      startDate = getFirstMonday(startYear, 8);
      endDate = new Date(endYear, 0, 1);
      break;
    case "Học kỳ 2":
      startDate = getFirstMonday(endYear, 1);
      endDate = new Date(endYear, 5, 11);
      break;
    case "Học kỳ Hè":
      startDate = getFirstMonday(endYear, 6);
      endDate = new Date(endYear, 7, 27);
      break;
    default:
      return [];
  }

  return generateWeeks(startDate, endDate);
};

export const findCurrentWeek = (weeks: string[]) => {
  const currentDate = new Date();

  if (weeks.length === 0) return "";

  for (const week of weeks) {
    const [start, end] = week.split(" - ").map((date) => {
      const parsedDate = new Date(date.split("/").reverse().join("-"));
      return new Date(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
        parsedDate.getDate(),
      );
    });

    const normalizedStart = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
    );
    const normalizedEnd = new Date(
      end.getFullYear(),
      end.getMonth(),
      end.getDate(),
    );
    const normalizedCurrent = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );

    if (
      normalizedCurrent >= normalizedStart &&
      normalizedCurrent <= normalizedEnd
    ) {
      return week;
    }
  }

  return weeks[0];
};

export const getDefaultSemester = () => {
  const currentMonth = new Date().getMonth() + 1;
  return currentMonth >= 8
    ? "Học kỳ 1"
    : currentMonth >= 1 && currentMonth <= 5
      ? "Học kỳ 2"
      : "Học kỳ Hè";
};

export const getMatchingDates = (
  startDate: string,
  endDate: string,
  dayOfWeek: number,
): string[] => {
  const resultDates: string[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    if (currentDate.getDay() === dayOfWeek) {
      resultDates.push(currentDate.toISOString().split("T")[0]);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return resultDates;
};
