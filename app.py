import os
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
app.config.from_object(app_config[config_name])


@auth.get_password
def get_password(username):
    if username == 'pedro':
        return os.getenv('SECRET')
    return None

def connectToDB():
    #Define our connection string
    conn_string=os.getenv('CONN_STRING')
    #print(conn_string)
    try:
        return psycopg2.connect(conn_string)
    except:
        print("Can't connect to database")

def queryDB(query, args=()):
    conn = connectToDB()
    #print(conn)
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    #print(cur)
    try:
        cur.execute(query, args)
        r = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
        #return (r[0] if r else None) if one else r
        return r
    except psycopg2.OperationalError as e:
        print("Error executing Statement")
        print('Error message:\n{0}').format(e)
        return None


@app.route('/')
def hello():
    return "Hello World!"

@app.route('/rooms')
@auth.login_required
def get_rooms():
    my_query = queryDB("SELECT * FROM testing_schema_pedro.rooms")
    #print(my_query)
    if my_query is None:
        abort(404)
    return jsonify(my_query);

@app.route('/rooms/pavC')
@auth.login_required
def get_rooms_pav_c():
    my_query = queryDB("""SELECT * FROM testing_schema_pedro.rooms WHERE "floorId" IN (430,431,432,433)""")
    #print(my_query)
    if my_query is None:
        abort(404)
    return jsonify(my_query);

@app.route('/rooms/<int:room_id>')
@auth.login_required
def get_room(room_id):
    my_query = queryDB("SELECT * FROM testing_schema_pedro.rooms WHERE id=%s", (room_id,))

    if my_query is None:
        abort(404)
    return jsonify(my_query);

@app.route('/rooms/<int:room_id>/computers')
@auth.login_required
def get_room_computers(room_id):
    my_query = queryDB("""SELECT * FROM testing_schema_pedro.computers WHERE "roomId"=%s""", (room_id,))

    if my_query is None:
        abort(404)
    return jsonify(my_query);

@app.route('/computers')
@auth.login_required
def get_computers():
    my_query = queryDB("SELECT * FROM testing_schema_pedro.computers")
    #print(my_query)
    if my_query is None:
        abort(404)
    return jsonify(my_query);

@app.route('/computers/pavC')
@auth.login_required
def get_computers_pav_c():
    my_query = queryDB("SELECT * FROM testing_schema_pedro.computers_pavc")
    #print(my_query)
    if my_query is None:
        abort(404)
    return jsonify(my_query);

@app.route('/computers/<int:computer_id>')
@auth.login_required
def get_computer(computer_id):
    my_query = queryDB("SELECT * FROM testing_schema_pedro.computers WHERE id=%s", (computer_id,))

    if my_query is None:
        abort(404)
    return jsonify(my_query);

@app.route('/locations')
@auth.login_required
def get_locations():
    my_query = queryDB("SELECT * FROM testing_schema_pedro.locations")
    #print(my_query)
    if my_query is None:
        abort(404)
    return jsonify(my_query);


@app.route('/computers/<int:hardware_id>', methods=['PUT'])
@auth.login_required
def update_computer(hardware_id):
    conn = connectToDB()
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    room_id = request.json.get('roomId',"")
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

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@auth.error_handler
def unauthorized():
    return make_response(jsonify({'error': 'Unauthorized access'}), 401)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
