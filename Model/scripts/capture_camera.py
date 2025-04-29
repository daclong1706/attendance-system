import cv2
import numpy as np
import os
from mtcnn import MTCNN
import tensorflow as tf

# Cấu hình bộ nhớ GPU để tránh lỗi tràn bộ nhớ
gpus = tf.config.list_physical_devices('GPU')
if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
    except RuntimeError as e:
        print(e)


def capture_face(save_dir, num_images=5, img_size=(160, 160)):
    os.makedirs(save_dir, exist_ok=True)

    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("Không thể mở camera.")
        return

    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    # Xác định tọa độ hình vuông bouding box
    square_size = 300  # Tăng kích thước hình vuông lên 300 pixel
    center_x = frame_width // 2
    center_y = frame_height // 2
    top_left = (center_x - square_size // 2, center_y - square_size // 2)
    bottom_right = (center_x + square_size // 2, center_y + square_size // 2)

    captured = 0

    # Khởi tạo MTCNN trên GPU
    with tf.device('/GPU:0'):
        detector = MTCNN()

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Không nhận được khung hình từ camera.")
            break

        frame_with_square = frame.copy()

        # Chuyển đổi khung hình sang RGB
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Phát hiện khuôn mặt bằng MTCNN trên GPU
        with tf.device('/GPU:0'):
            faces = detector.detect_faces(frame_rgb)

        # Vẽ hình vuông
        cv2.rectangle(frame_with_square, top_left,
                      bottom_right, (0, 255, 0), 2)

        matched = False
        face_roi = None

        # Kiểm tra xem khuôn mặt có nằm hoàn toàn trong hình vuông không
        for face in faces:
            x, y, w, h = face['box']
            if (x >= top_left[0] and y >= top_left[1] and
                    x + w <= bottom_right[0] and y + h <= bottom_right[1]):
                matched = True
                face_roi = frame[y:y + h, x:x + w]
                break

        # Hiển thị thông báo
        if matched:
            cv2.putText(frame_with_square, f"Da can chinh. Nhan 'c' de chup ({captured}/{num_images})",
                        (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        else:
            cv2.putText(frame_with_square, "Can chinh khuon mat trong hinh vuong.",
                        (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)

        cv2.imshow('Camera', frame_with_square)

        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            print("Đã thoát chụp ảnh.")
            break
        if key == ord('c') and matched and face_roi is not None:
            # Thay đổi kích thước ảnh
            face_resized = cv2.resize(face_roi, img_size)
            img_name = f"img{captured+1}.png"
            path = os.path.join(save_dir, img_name)
            cv2.imwrite(path, face_resized)
            print(f"Đã lưu ảnh khuôn mặt: {img_name}")
            captured += 1
            if captured >= num_images:
                print("Đã chụp đủ số lượng ảnh.")
                break

    cap.release()
    cv2.destroyAllWindows()


# Kiểm tra GPU và chạy chương trình
if __name__ == "__main__":
    print("Danh sách thiết bị GPU:", tf.config.list_physical_devices('GPU'))
    capture_face("faces", num_images=5)
