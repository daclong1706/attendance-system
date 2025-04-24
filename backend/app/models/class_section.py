from app.extensions import db


class ClassSection(db.Model):
    __tablename__ = "class_sections"
    id = db.Column(db.Integer, primary_key=True)
    subject_id = db.Column(
        db.Integer, db.ForeignKey("subjects.id"), nullable=False
    )
    teacher_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False
    )
    room = db.Column(db.String(100), nullable=False)
    day_of_week = db.Column(db.Integer, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    semester = db.Column(db.String(20), nullable=False)
    year = db.Column(db.Integer, nullable=False)

    subject = db.relationship("Subject", backref="class_sections")
    teacher = db.relationship("User", backref="teaching_classes")

    def __repr__(self):
        return f"ClassSection('{self.room}', '{self.semester}', '{self.year}')"
