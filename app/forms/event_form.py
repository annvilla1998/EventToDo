from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Event

def event_name_exists(form, field):
    # Checking if user exists
    name = field.data
    event = Event.query.filter(Event.name == name).first()
    if event:
        raise ValidationError('Email address is already in use.')


class EventForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message="Give your event a name!"),event_name_exists])
