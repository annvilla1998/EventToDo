from flask import Blueprint, jsonify
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

# @event_routes.route('/')
# @login_required
# def read_events():
#     user = User.query.get(current_user.id)
    