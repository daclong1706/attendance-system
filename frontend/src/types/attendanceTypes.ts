export interface AttendanceSession {
  id: number;
  class_section_id: number;
  date: string; // YYYY-MM-DD
  qr_code_start: string;
  qr_code_end: string;
}

export interface Attendance {
  id: number;
  //   student_id: number;
  //   attendance_session_id: number;
  name: string;
  email: string;
  mssv: string;
  attendance_status:
    | "present"
    | "absent"
    | "excused_absence"
    | "late"
    | "not_recorded";
}

export interface AttendanceResponse {
  data: {
    id: number; // class_section_id
    students: Attendance[];
  };
}

export interface AttendanceRequest {
  id: number;
  status: string;
}
