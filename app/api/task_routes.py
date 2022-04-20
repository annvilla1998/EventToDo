from flask import Blueprint, jsonify, request
from app.models import Event, db, Task, Comment, User
from flask_login import current_user, login_required
from datetime import datetime, timezone
from app.forms.event_form import EventForm


task_routes = Blueprint('tasks', __name__)



@task_routes.route('/<id>', methods=["PUT"])
def set_complete_task(id):
    data = request.get_json(force=True)
    task = Task.query.filter(Task.id == id).first()
    task.completed = data["completed"]
    # print(task.completed)
    db.session.add(task)
    db.session.commit()
    return task.to_dict()