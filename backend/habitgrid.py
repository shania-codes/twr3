from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import time
import sqlite3


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"

db = SQLAlchemy(app)

# DB
class habit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(200))



with app.app_context():
    db.create_all()  # creates tables if not exist

# Routes
@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}