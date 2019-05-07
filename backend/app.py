import os
import alloc_script
from flask import Flask, jsonify, abort, make_response, request
from config import app_config
import json
import psycopg2
import psycopg2.extras
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS

auth = HTTPBasicAuth()

app = Flask(__name__)
CORS(app)
config_name = os.getenv('APP_SETTINGS') # config_name = "development"
#app.config.from_object(app_config[config_name])


@auth.get_password
def get_password(username):
    if username == 'roomplanneruser':
        return os.getenv('SECRET')
    return None

# Error Handling

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Page Not Found. Resource requested does not exist.'}), 404)

@auth.error_handler
def unauthorized():
    # return 403 instead of 401 to prevent browsers from displaying the default
    # auth dialog
    return make_response(jsonify({'error': 'Unauthorized access.'}), 403)

@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({'error': 'Bad request. Your request has missing arguments or is malformed.'}), 400)



def connectToDB():
    #Define our connection string
    conn_string=os.getenv('CONN_STRING')
    #print(conn_string)
    try:
        return psycopg2.connect(conn_string)
    except psycopg2.OperationalError as e:
        print("Can't connect to database")
        print('Error message:\n{0}').format(e)

def queryDB(query, args=()):
    conn = connectToDB()
    #print(conn)
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    #print(cur)
    try:
        cur.execute(query, args)
        #print(query)
        r = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]

        if r is None:
            abort(404)
        if(conn):
            cur.close()
            conn.close()
        return r
    except psycopg2.OperationalError as e:
        print("Error executing Statement")
        print('Error message:\n{0}').format(e)
        return None


@app.route('/')
def hello():
    return "Hello, World!"

@app.route('/get_days')
@auth.login_required
def get_days():
    start_date = request.args.get('start',"")
    end_date = request.args.get('end',"")
    pavillion = request.args.get('pav',"")

    if not start_date or not end_date or not pavillion:
        abort(400)
    return jsonify(alloc_script.get_days(pavillion, start_date, end_date))

@app.route('/alloc')
@auth.login_required
def alloc():
    start_date = request.args.get('start',"")
    end_date = request.args.get('end',"")
    pavillion = request.args.get('pav',"")

    if not start_date or not end_date or not pavillion:
        abort(400)
    return jsonify(alloc_script.alloc(pavillion, start_date, end_date))

@app.route('/rooms')
@auth.login_required
def get_rooms():
    my_query = queryDB("SELECT * FROM testing_schema_pedro.cms_room_content_v")
    return jsonify(my_query)

@app.route('/rooms/pav/<string:pav_initial>')
@auth.login_required
def get_rooms_pav(pav_initial):
    if not pav_initial:
        abort(400)
    my_query = queryDB("""SELECT * FROM testing_schema_pedro.cms_room_content_v WHERE pav_initial=%s ORDER BY room_number""", (pav_initial,))
    return jsonify(my_query)

@app.route('/rooms/<int:room_id>')
@auth.login_required
def get_room(room_id):
    if not room_id:
        abort(400)

    my_query = queryDB("SELECT * FROM testing_schema_pedro.cms_room_content_v WHERE id=%s", (room_id,))
    return jsonify(my_query)

@app.route('/rooms/room_number/<string:room_number>')
@auth.login_required
def get_room_with_number(room_number):
    if not room_number:
        abort(400)

    my_query = queryDB("SELECT * FROM testing_schema_pedro.cms_room_content_v WHERE room_number=%s", (room_number,))
    return jsonify(my_query)

@app.route('/rooms/number_of_computers/<string:room_number>')
@auth.login_required
def get_number_of_computers(room_number):
    
    if not room_number:
        abort(400)

    my_query = queryDB("SELECT number_of_computers FROM testing_schema_pedro.cms_room_content_v WHERE room_number=%s", (room_number,))

    return jsonify(my_query)

@app.route('/rooms/<int:room_id>', methods=['PUT'])
@auth.login_required
def update_room(room_id):
    conn = connectToDB()
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    max_capacity = request.json.get('max_capacity',"")
    notes = request.json.get('notes',"")
    try:
        #print(comments)
        cur.execute("""UPDATE room SET max_capacity=%s, notes=%s WHERE id=%s""", (max_capacity, notes, room_id))

    except psycopg2.OperationalError as e:
        print("ERROR Updating room")
        print('Error message:\n{0}').format(e)
        conn.rollback()
        abort(400)

    conn.commit()
    return jsonify(success=True)


@app.route('/rooms/<int:room_id>/computers')
@auth.login_required
def get_room_computers(room_id):
    my_query = queryDB("""SELECT * FROM testing_schema_pedro.computers_v WHERE room_id=%s""", (room_id,))
    return jsonify(my_query)

@app.route('/rooms/<int:room_id>/persons')
@auth.login_required
def get_room_persons(room_id):
    my_query = queryDB("""SELECT * FROM testing_schema_pedro.persons_v WHERE room_id=%s""", (room_id,))
    return jsonify(my_query)

@app.route('/rooms/room_number/<string:room_number>/computers')
@auth.login_required
def get_room_computers_with_number(room_number):
    if not room_number:
        abort(400)

    my_query = queryDB("""SELECT * FROM testing_schema_pedro.computers_v WHERE room_number=%s""", (room_number,))
    return jsonify(my_query)

@app.route('/rooms/room_number/<string:room_number>/persons')
@auth.login_required
def get_room_persons_with_number(room_number):
    if not room_number:
        abort(400)

    my_query = queryDB("""SELECT * FROM testing_schema_pedro.persons_v WHERE room_name=%s""", (room_number,))
    return jsonify(my_query)

@app.route('/persons')
@auth.login_required
def get_persons():
    my_query = queryDB("SELECT * FROM testing_schema_pedro.persons_v")
    return jsonify(my_query)

@app.route('/persons/<int:person_id>')
@auth.login_required
def get_person(person_id):
    my_query = queryDB("SELECT * FROM testing_schema_pedro.persons_v WHERE id=%s", (person_id,))
    return jsonify(my_query)

@app.route('/persons/pav/<string:pav_initial>')
@auth.login_required
def get_persons_pav(pav_initial):
    if not pav_initial:
        abort(400)
    my_query = queryDB("""SELECT * FROM testing_schema_pedro.persons_v WHERE room_name LIKE  '%%' || %s || '%%' ORDER BY room_name""", (pav_initial,))
    return jsonify(my_query)

@app.route('/computers')
@auth.login_required
def get_computers():
    my_query = queryDB("SELECT * FROM testing_schema_pedro.computers_v")
    return jsonify(my_query)

@app.route('/computers/pav/<string:pav_initial>')
@auth.login_required
def get_computers_pav(pav_initial):
    if not pav_initial:
        abort(400)
    my_query = queryDB("""SELECT * FROM testing_schema_pedro.computers_v WHERE room_number LIKE  '%%' || %s || '%%' ORDER BY room_number""", (pav_initial,))
    return jsonify(my_query)

@app.route('/computers/<int:computer_id>')
@auth.login_required
def get_computer(computer_id):
    my_query = queryDB("SELECT * FROM testing_schema_pedro.computers_v WHERE id=%s", (computer_id,))
    return jsonify(my_query)

@app.route('/locations')
@auth.login_required
def get_locations():
    my_query = queryDB("SELECT * FROM testing_schema_pedro.locations")
    return jsonify(my_query)


@app.route('/computers/<int:hardware_id>', methods=['PUT'])
@auth.login_required
def update_computer(hardware_id):
    conn = connectToDB()
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    room_id = request.json.get('room_id',"")
    comments = request.json.get('description',"")
    #print(room_id)
    try:
        #print(comments)
        cur.execute("""UPDATE hardwares SET room_id=%s, comments=%s WHERE id=%s""", (room_id, comments, hardware_id))

    except psycopg2.OperationalError as e:
        print("ERROR Updating computer")
        print('Error message:\n{0}').format(e)
        conn.rollback()
        abort(400)

    conn.commit()
    return jsonify(success=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
