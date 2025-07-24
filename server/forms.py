from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField, FloatField
from wtforms.validators import DataRequired, Email, Length, NumberRange

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

class Step1Form(FlaskForm):
    full_name = StringField('Full Name', validators=[DataRequired(), Length(min=2, max=100)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    submit = SubmitField('Next')

class Step2Form(FlaskForm):
    mineral = SelectField('Mineral', coerce=int, validators=[DataRequired()])
    quantity = FloatField('Quantity (kg)', validators=[DataRequired(), NumberRange(min=0.1)])
    submit = SubmitField('Next')

class Step3Form(FlaskForm):
    destination = SelectField('Destination', choices=[
        ('Nairobi', 'Nairobi'),
        ('Mombasa', 'Mombasa'),
        ('Kisumu', 'Kisumu'),
        ('Eldoret', 'Eldoret')
    ], validators=[DataRequired()])
    submit = SubmitField('Book Shipment')
