from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import time
from datetime import datetime, date, timedelta


app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db" # ./instance/data.db
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# DB
class Habits(db.Model):
    # snake_case
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(200))

    logs = db.relationship("HabitLog", backref="habit", lazy=True, cascade="all, delete-orphan")

    # lowerCamelCase
    def tojson(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
        }


class HabitLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    habit_id = db.Column(db.Integer, db.ForeignKey("habits.id"), nullable=False)
    date = db.Column(db.Date, default=date.today, index=True)
    completed = db.Column(db.Boolean, default=False)

    def tojson(self):
        return {
            "id": self.id,
            "habitID": self.habit_id,
            "date": self.date.isoformat(),
            "completed": self.completed,
        }


with app.app_context():
    db.create_all()  # creates tables if not exist


# Routes
## Time
@app.route('/api/time')
def get_current_time():
    return {'time': time.time()} # 200 OK


## Habit
### Create
@app.route("/api/new_habit", methods=["GET", "POST"])
def new_habit():
    name = request.json.get("name")
    description = request.json.get("description")

    if not name:
        return jsonify({"message":"You must include a name"}), 400 # Bad request

    new_habit = Habits(name=name, description=description)
    try:
        db.session.add(new_habit)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400 # Bad request

    return jsonify({"message":"Habit saved"}), 201 # Created

### Read
@app.route("/api/get_all_habits")
def get_all_habits():
    habits = Habits.query.all()
    json_habits = list(map(lambda habit: habit.tojson(), habits))
    return jsonify({"habits":json_habits})

### Update
@app.route("/api/update_habit/<int:habit_id>", methods=["POST"])
def update_habit(habit_id):
    habit = Habits.query.get(habit_id)

    if not habit:
        return jsonify({"message": "Habit not found"}), 404 # Not found

    data = request.json
    habit.name = data.get("name", habit.name)
    habit.description = data.get("description", habit.description)

    db.session.commit()

    return jsonify({"message":"Habit updated"}), 200 # OK

### Delete
@app.route("/api/delete_habit/<int:habit_id>", methods=["POST"])
def delete_habit(habit_id):
    habit = Habits.query.get(habit_id)

    if not habit:
        return jsonify({"message": "User not found"}), 404 # Not found

    db.session.delete(habit)
    db.session.commit()

    return jsonify({"message":"Habit deleted"}), 200 # OK


## Habit completion status
### Create?

### Read
@app.route("/api/get_habit_logs")
def get_habit_logs():
    today = date.today()
    start_date = today - timedelta(days=6)
    logs = HabitLog.query.filter(HabitLog.date >= start_date).all()

    logs_by_habit = {}
    for log in logs:
        logs_by_habit.setdefault(log.habit_id, {})[log.date.isoformat()] = log.completed

    return jsonify({"logs": logs_by_habit})

### Update
#### Mark habit as complete for a certain day
@app.route("/api/complete_habit", methods=["POST"])
def complete_habit():
    data = request.json
    habit_id = data.get("habitID")
    date_str = data.get("date")
    completed = data.get("completed", True)

    if not (habit_id and date):
        return jsonify({"message":"Select a habit and a date."}), 400 # Bad request

    parsed_date = date.fromisoformat(date_str)
    log = HabitLog.query.filter_by(habit_id=habit_id, date=parsed_date, completed=completed).first()
    
    if not log:
        log = HabitLog(habit_id=habit_id, date=parsed_date, completed=completed)
        db.session.add(log)
    else:
        log.completed = completed

    db.session.commit()
    return jsonify({"message": "Habit completion status updated"}), 200 # OK


### Delete


## Template
### Create

### Read

### Update

### Delete