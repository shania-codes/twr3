# Habit Grid
A single page, minimalist habit tracker which displays your weekly progress as a grid of buttons. The goal is to improve my frontend skills and learn React, Tailwind and SQLAlchemy.  
[Live Demo (slow)](http://http://46.101.90.169:5173/)

## Features
- Create edit and delete habits
- See completion status of habits for the past 7 days
- See time you first load the page
- Data stored locally since it is a self hostable application (doesn't apply to demo)
- API and DB Schema for Habits and Habit log
- Responsive single page UI with modals for create and edit habit input

### Planned Features
- TUI or Local (Linux) edition
- "Homescreen" like grid layout for different pages

## Stack / Docs / Tutorials
- [React](https://react.dev/) including [React DOM](https://react.dev/reference/react-dom)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flask](https://flask.palletsprojects.com/en/stable/)
- [Flask-SQLAlchemy](https://flask-sqlalchemy.readthedocs.io/en/stable/) using SQLite  

NOT RECOMMENDED

---

- [Response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status#successful_responses)  

---

- [Flask React Project Tutorial](https://blog.miguelgrinberg.com/post/create-a-react-flask-project-in-2025)
- [Flask + React Tutorial](https://www.youtube.com/watch?v=PppslXOR7TA) I don't recommend this

## Self Hosting Guide (intended use)
Prerequisites: Python 3, npm
```sh
git clone https://github.com/shania-codes/twr3
cd twr3/backend
python3 -m venv venv # Windows: python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate  
pip install flask flask-sqlalchemy flask-cors
cd ../frontend

sudo apt install npm # nearly 700MB
npm install
npm run api # then press Ctrl+L
npm run host # press Ctrl+L again if you want to do anything else but you can now close the terminal and visit http://ip:5173/
```