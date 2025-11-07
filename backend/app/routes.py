from app import app
import time

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}