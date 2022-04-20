from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, URL
from app.models import User
from flask_wtf.file import FileAllowed


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


# def is_image(message=u'Images only!', extensions=None):
#     if not extensions:
#         extensions = ('jpg', 'jpeg', 'png', 'gif')
#     def _is_image(form, field):
#         if not field.data or field.data.split('.')[-1] not in extensions:
#             raise ValidationError(message)
#     return _is_image

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, Email(message="Must be a valid email address")])
    password = StringField('password', validators=[DataRequired()])
    profile_image = StringField('profile_image', validators=[FileAllowed(['jpg', 'png','jpeg', 'gif'], message="Please provide a valid image file (.jpg, .png, .jpeg)")])
