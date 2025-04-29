## Frontend

npm install
npm run dev

## Backend

pip install -r requirements.txt

flask db init
flask db migrate -m "Initial"
flask db upgrade


## Hướng dẫn chạy code 
# B1: Cài đặt các thư viện cần thiết
 pip install -r requirements.txt
# B2: Thực hiện chạy code file register_user.py để tạo ra học sinh mới. Với mội học sinh mới cần cung cấp 5 tấm hình. Các tấm hình này sẽ được chuyển sang file numpy và bị xóa đi. \
# B3: Thực hiện chạy file mark_attendance.py để điểm danh. Người điểm danh sẽ chụp 1 tấm ảnh và code sẽ so sánh độ tương đồng với các embedding đang có trong database. Nếu điểm danh thành công thông tin của học sinh sẽ được lưu vào file attendance.csv	
