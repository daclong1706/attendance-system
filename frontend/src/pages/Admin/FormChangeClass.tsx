import { useEffect, useState } from "react";
import { fetchAllTeacher } from "../../store/slices/userReducer";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import LoadingModal from "../../components/modal/LoadingModal";
import { showErrorMessage, showSuccessMessage } from "../../helper/toastHelper";
import { Button, FloatingLabel, Select, Datepicker } from "flowbite-react";
import { fetchAllSubjects } from "../../store/slices/subjectReducer";
import { updateClass, fetchAllClasses } from "../../store/slices/classReducer";
import { Class_session } from "../../types/classType";
import axiosClient from "../../api/axiosClient";

interface FormChangeClassProps {
  isOpen: boolean;
  classID: number;
  onClose: () => void;
}

const FormChangeClass: React.FC<FormChangeClassProps> = ({
  isOpen,
  onClose,
  classID,
}) => {
  const today = new Date();
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(today.getMonth() + 3);

  const sixMonthsLater = new Date();
  sixMonthsLater.setMonth(today.getMonth() + 6);

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const { users } = useAppSelector((state) => state.user);
  const { subjects } = useAppSelector((state) => state.subject);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  // const [classData, setClassData] = useState<Class_session>();

  const [updatedData, setUpdatedData] = useState<Class_session>();
  const iy = async (id: number) => {
    try {
      const response = await axiosClient.get<Class_session[]>(
        "/class/infoClassID",
        {
          params: { id },
        },
      );

      setUpdatedData(response.data[0]);
    } catch {
      showErrorMessage("Sai");
    }
  };
  useEffect(() => {
    iy(classID);
    setIsLoading(false);
  }, [classID]);
  useEffect(() => {
    if (updatedData && Object.keys(updatedData).length > 0) {
      console.log("updatedData đã cập nhật:", updatedData);
      if (isComplete) {
        try {
          if (updatedData)
            dispatch(updateClass({ classId: classID, updatedData })).unwrap();
          dispatch(fetchAllClasses());
          showSuccessMessage("Tạo lớp học thành công");
          onClose();
        } catch {
          showErrorMessage("Lỗi khi chỉnh sửa lớp học!");
          setIsLoading(true);
        }
        setIsComplete(false);
        onClose();
      }
    }
  }, [updatedData]);
  useEffect(() => {
    dispatch(fetchAllSubjects());
    dispatch(fetchAllTeacher());
  }, [dispatch]);
  const handleDate = (dateString: string) => {
    // Phân tích chuỗi gốc thành đối tượng Date
    const dateObject = new Date(dateString);

    // Lấy các thành phần Năm, Tháng, Ngày
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // getMonth() trả về 0-11
    const day = dateObject.getDate().toString().padStart(2, "0");

    // Ghép lại thành chuỗi 'YYYY-MM-DD'
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedData && Object.keys(updatedData).length === 0) {
      showErrorMessage("Vui lòng nhập thông tin cần cập nhật!");
      return;
    }
    if (updatedData) {
      setUpdatedData({
        ...updatedData,
        start_time: updatedData.start_time.substring(0, 5),
        end_time: updatedData.end_time.substring(0, 5),
        start_date: handleDate(updatedData.start_date),
        end_date: handleDate(updatedData.end_date),
      });
    }
    setIsComplete(true);
    console.log("Data cuối: ", updatedData);
  };

  if (!isOpen) return false;
  if (!updatedData) return <LoadingModal isOpen={true} />;
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50`}
    >
      <div className="-mt-50 w-1/2 rounded-lg bg-white p-6 py-12 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Chỉnh sửa thông tin lớp học</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FloatingLabel
            variant="outlined"
            label="Phòng"
            type="text"
            value={updatedData.room}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, room: e.target.value })
            }
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <Select
              id="subject_iD"
              required
              value={updatedData.subject_id ?? ""}
              onChange={(e) =>
                setUpdatedData({
                  ...updatedData,
                  subject_id: Number(e.target.value),
                })
              }
            >
              <option value="" disabled>
                Chọn môn học
              </option>
              {subjects.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Select>

            <Select
              id="teacher_iD"
              required
              value={updatedData.teacher_id ?? ""}
              onChange={(e) =>
                setUpdatedData({
                  ...updatedData,
                  teacher_id: Number(e.target.value),
                })
              }
            >
              <option value="" disabled>
                Chọn giáo viên
              </option>
              {users.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-16 gap-2">
            <Select
              className="col-span-4"
              id="dayOfWeek"
              required
              value={updatedData.day_of_week}
              onChange={(e) =>
                setUpdatedData({
                  ...updatedData,
                  day_of_week: Number(e.target.value),
                })
              }
            >
              <option value="" disabled>
                Chọn thứ
              </option>
              <option value={1}>Thứ 2</option>
              <option value={2}>Thứ 3</option>
              <option value={3}>Thứ 4</option>
              <option value={4}>Thứ 5</option>
              <option value={5}>Thứ 6</option>
              <option value={6}>Thứ 7</option>
              <option value={0}>Chủ nhật</option>
            </Select>
            <div className="flex items-center justify-center">-</div>
            <Datepicker
              className="col-span-5"
              title="Ngày bắt đầu"
              minDate={today}
              maxDate={threeMonthsLater}
              value={new Date(updatedData.start_date)}
              required
              onChange={(date: Date | null) => {
                if (date)
                  setUpdatedData({
                    ...updatedData,
                    start_date: date?.toISOString().split("T")[0],
                  });
              }}
            />
            <div className="flex items-center justify-center">-</div>
            <Datepicker
              className="col-span-5"
              title="Ngày kết thúc"
              minDate={threeMonthsLater}
              maxDate={sixMonthsLater}
              value={new Date(updatedData.end_date)}
              required
              onChange={(date: Date | null) => {
                if (date)
                  setUpdatedData({
                    ...updatedData,
                    end_date: date?.toISOString().split("T")[0],
                  });
              }}
            />
          </div>

          <Select
            id="timeSlot"
            required
            value={`${updatedData.start_time}-${updatedData.end_time}`}
            onChange={(e) => {
              const [start, end] = e.target.value.split("-");
              if (start && end) {
                setUpdatedData({
                  ...updatedData,
                  start_time: start,
                  end_time: end,
                });
              }
            }}
          >
            <option value="" disabled>
              Chọn khung giờ
            </option>
            <option value="06:30-09:00">06:30 - 09:00</option>
            <option value="07:20-10:50">07:20 - 10:50</option>
            <option value="09:00-11:30">09:00 - 11:30</option>
            <option value="12:30-15:00">12:30 - 15:00</option>
            <option value="12:30-16:30">12:30 - 16:30</option>
            <option value="15:10-17:40">15:10 - 17:40</option>
          </Select>

          <div className="grid grid-cols-2 gap-2">
            <FloatingLabel
              variant="outlined"
              label="Năm học"
              type="number"
              min={today.getFullYear()}
              max={today.getFullYear() + 1}
              value={updatedData.year ? updatedData.year : today.getFullYear()}
              onChange={(e) =>
                setUpdatedData({
                  ...updatedData,
                  year: e.target.valueAsNumber,
                })
              }
              required
            />
            <Select
              id="semester"
              required
              value={updatedData.semester}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, semester: e.target.value })
              }
            >
              <option value="" disabled>
                Chọn học kỳ
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="Hè">Hè</option>
            </Select>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button type="button" color="red" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" color="green">
              Thay đổi thông tin lớp học
            </Button>
          </div>
        </form>
      </div>
      <LoadingModal isOpen={loading} />
      <LoadingModal isOpen={isLoading} />
    </div>
  );
};

export default FormChangeClass;
