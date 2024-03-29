from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(2000), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('events.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default = datetime.utcnow)
    updated_at = db.Column(db.DateTime, default = datetime.utcnow)  

    events = db.relationship("Event", back_populates="comments")  
    users = db.relationship("User", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'event_id': self.event_id,
            'user_id': self.user_id,
            'updated_at': self.updated_at,
            'events': self.events.to_dict(),
            'users': {user.id: user.to_dict() for user in self.users},
        }
