from .db import db
from datetime import datetime


class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"),nullable=False)
    created_at = db.Column(db.DateTime, default = datetime.utcnow)
    updated_at = db.Column(db.DateTime, default = datetime.utcnow)    

    comments = db.relationship("Comment", back_populates="events", cascade="all, delete")
    users = db.relationship("User", back_populates="events")
    tasks = db.relationship("Task", back_populates="events")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'updated_at': self.updated_at,
            'users': self.users.to_dict(), 
        }
