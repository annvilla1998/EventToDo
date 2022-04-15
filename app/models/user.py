from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_image = db.Column(db.String(255), nullable=True)

    events = db.relationship("Event", back_populates="users")
    tasks = db.relationship("Task", back_populates="users")
    comments = db.relationship("Comment", back_populates="users")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "profile_image": self.profile_image,
            'events': {event.id: event.to_dict() for event in self.events},
            'tasks':[task.to_dict() for task in self.tasks],
            'comments': {comment.id: comment.to_dict() for comment in self.comments},
        }
