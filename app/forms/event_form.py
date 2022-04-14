from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError




class EventForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message="Give your event a name!")])
