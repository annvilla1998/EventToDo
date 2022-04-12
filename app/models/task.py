from .db import db
from datetime import datetime


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    due_date = db.Column(db.Date, nullable=True)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default = datetime.utcnow)
    updated_at = db.Column(db.DateTime, default = datetime.utcnow)    

    users = db.relationship("User", back_populates="tasks")
    events = db.relationship("Event", back_populates="tasks")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'completed': self.completed,
            'due_date':self.due_date,
            'event_id': self.event_id,
            'user_id': self.user_id,
            'updated_at': self.updated_at,
            'users': self.users.to_dict(), 
            'events': self.events.to_dict(),
        }
