from flask import Blueprint, jsonify, request
from app.models import Event, db, Task, Comment, User
from flask_login import current_user, login_required
from datetime import datetime, timezone
from app.forms.event_form import EventForm


task_routes = Blueprint('tasks', __name__)

@task_routes.route('/all')
def all_tasks():
    tasks = Task.query.filter(Task.user_id == current_user.id).all()
    tasks_dictionary = {}
    for task in tasks:
        task.to_dict()
        tasks_dictionary[task.id] = task.to_dict()
    print(tasks_dictionary)
    return tasks_dictionary


@task_routes.route('/<id>', methods=["PUT"])
def set_complete_task(id):
    data = request.get_json(force=True)
    task = Task.query.filter(Task.id == id).first()
    task.completed = data["completed"]
    # print(task.completed)
    db.session.add(task)
    db.session.commit()
    return task.to_dict()

@task_routes.route('/today')
def get_today_tasks():
    today = datetime.today().strftime('%Y-%m-%d')
    tasks = Task.query.filter(Task.due_date == today).all()
    tasks_dictionary = {}
    for task in tasks:
        task.to_dict()
        tasks_dictionary[task.id] = task.to_dict()
    return tasks_dictionary

@task_routes.route('/completed')
def get_completed_tasks():
    tasks = Task.query.filter(Task.completed == True).all()
    tasks_dictionary = {}
    for task in tasks:
        task.to_dict()
        tasks_dictionary[task.id] = task.to_dict()
    return tasks_dictionary

