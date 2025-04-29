import argparse
import sys
from register_user import register_user
from mark_attendance import perform_attendance


def main():
    parser = argparse.ArgumentParser(
        description='Hệ thống điểm danh bằng khuôn mặt')
    subparsers = parser.add_subparsers(dest='command', help='Các lệnh')

    # Lệnh đăng ký người dùng mới
    parser_register = subparsers.add_parser(
        'register', help='Đăng ký người dùng mới')
    parser_register.add_argument(
        '--user_id', type=str, required=True, help='ID của người dùng mới')
    parser_register.add_argument(
        '--num_images', type=int, default=5, help='Số lượng ảnh cần chụp')

    # Lệnh điểm danh
    parser_attendance = subparsers.add_parser(
        'attendance', help='Thực hiện điểm danh')

    args = parser.parse_args()

    if args.command == 'register':
        register_user(user_id=args.user_id, num_images=args.num_images)
    elif args.command == 'attendance':
        perform_attendance()
    else:
        parser.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()
