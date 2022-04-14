from flask import Blueprint, jsonify, request
from app.models import Event, db, Task, Comment, User
from flask_login import current_user, login_required
from datetime import datetime, timezone


event_routes = Blueprint('events', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@event_routes.route('/')
def get_events():
    user = User.query.get(current_user.id)
    events = Event.query.filter(Event.user_id == user.id).all()
    return { 'events': [events.to_dict() for events in events]}

@event_routes.route('/', methods=["POST"])
def post_event():
    data = request.get_json(force=True)
    
    new_event = Event(
        name = data["name"],
        user_id = data["user_id"],
    )
    db.session.add(new_event)
    db.session.commit()
    return new_event.to_dict()


@event_routes.route('/<id>', methods=["PUT","DELETE"])
def edit_delete_event(id):
    if request.method == "PUT":
        event = Event.query.filter(Event.id == id).first()
        data = request.get_json(force=True)
        event.user_id = data["user_id"]
        event.name = data["name"]

        db.session.add(event)
        db.session.commit()
        return event.to_dict()
    elif request.method == "DELETE":
        event = Event.query.filter(Event.id == id).first()
        db.session.delete(event)
        db.session.commit()