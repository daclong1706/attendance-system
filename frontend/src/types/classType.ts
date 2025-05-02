import { Student } from "./studentType";

export interface Class {
  id: number;
  subject_name: string;
  subject_code: string;
  student_count: number;
  teacher_name: string;
  day_of_week: number;
  start_date: string;
  end_date: string;
}

export interface ClassDetail {
  id: number;
  subject_name: string;
  subject_code: string;
  room: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  start_date: string;
  end_date: string;
  students: Student[];
}

export interface Class_session {
  id: number;
  subject_id: number;
  teacher_id: number;
  room: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  start_date: string;
  end_date: string;
  semester: string;
  year: number;
}
