from app.extensions import db

class Enrollment(db.Model):
    __tablename__ = 'enrollments'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    class_section_id = db.Column(db.Integer, db.ForeignKey('class_sections.id'), nullable=False)

    student = db.relationship('User', backref='enrollments')
    class_section = db.relationship('ClassSection', backref='enrollments')

    __table_args__ = (db.UniqueConstraint('student_id', 'class_section_id', name='_student_class_uc'),)

    def __repr__(self):
        return f"Enrollment('{self.student_id}', '{self.class_section_id}')"