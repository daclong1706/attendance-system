from app.extensions import db

class AttendanceSession(db.Model):
    __tablename__ = 'attendance_sessions'
    id = db.Column(db.Integer, primary_key=True)
    class_session_id = db.Column(db.Integer, db.ForeignKey('class_sections.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    qr_code_start = db.Column(db.String(255), nullable=False)  # Đổi TEXT -> VARCHAR để tối ưu lưu trữ
    qr_code_end = db.Column(db.String(255), nullable=False)

    class_session = db.relationship('ClassSection', backref='attendance_sessions')

    __table_args__ = (db.UniqueConstraint('class_session_id', 'date', name='_class_session_date_uc'),)

    def __repr__(self):
        return f"AttendanceSession('{self.class_session_id}', '{self.date}')"


class Attendance(db.Model):
    __tablename__ = 'attendances'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    attendance_session_id = db.Column(db.Integer, db.ForeignKey('attendance_sessions.id'), nullable=False)
    status = db.Column(db.Enum('present', 'absent', 'excused_absence', 'late', 'not_recorded'), default='not_recorded')
    checked_at = db.Column(db.DateTime)

    student = db.relationship('User', backref='attendances')
    attendance_session = db.relationship('AttendanceSession', backref='attendances')

    __table_args__ = (db.UniqueConstraint('student_id', 'attendance_session_id', name='_student_attendance_uc'),)

    def __repr__(self):
        return f"Attendance('{self.student_id}', '{self.attendance_session_id}', '{self.status}')"


class AttendanceLog(db.Model):
    __tablename__ = 'attendance_logs'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    attendance_session_id = db.Column(db.Integer, db.ForeignKey('attendance_sessions.id'), nullable=False)
    status = db.Column(db.Enum('present', 'absent', 'excused_absence', 'late', 'not_recorded'), default='not_recorded')
    checked_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())

    student = db.relationship('User', backref='attendance_logs')
    attendance_session = db.relationship('AttendanceSession', backref='attendance_logs')

    def __repr__(self):
        return f"AttendanceLog('{self.student_id}', '{self.attendance_session_id}', '{self.status}', '{self.checked_at}')"