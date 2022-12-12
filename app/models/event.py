from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Event(db.Model):
    __tablename__ = 'events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    text_color = db.Column(db.String(50), nullable=True)
    background_color = db.Column(db.String(50), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')),nullable=False)
    created_at = db.Column(db.DateTime, default = datetime.utcnow)
    updated_at = db.Column(db.DateTime, default = datetime.utcnow)    

    comments = db.relationship("Comment", back_populates="events", cascade="all, delete")
    users = db.relationship("User", back_populates="events", lazy='subquery')
    tasks = db.relationship("Task", back_populates="events", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'text_color': self.text_color,
            'background_color': self.background_color,
            'user_id': self.user_id,
            'updated_at': self.updated_at,
            'tasks': {task.id: task.to_dict() for task in self.tasks}
            # 'users': self.users.to_dict(), 
        }
