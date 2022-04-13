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
