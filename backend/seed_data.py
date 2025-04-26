from seed import (
    runUser,
    runSubject,
    runClassSection,
    runEnrollment,
    runAttendanceSession,
    runAttendance,
)


def run():
    runUser()
    runSubject()
    runClassSection()
    runEnrollment()
    runAttendanceSession()
    runAttendance()
    print("Đã thêm tất cả dữ liệu thành công!")
if __name__ == "__main__":
    run()
