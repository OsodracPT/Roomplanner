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
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    try:
        cur.execute(query, args)
        r = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
        #return (r[0] if r else None) if one else r
        return r
    except:
        print("Error executing Statement")
        return None


@app.route('/')
def hello():
    return "Hello World!"



@app.route('/computers')
@auth.login_required
def get_computers():
    my_query = queryDB("SELECT * FROM testing_schema_pedro.computers")
    #print(my_query)
    if my_query is None:
        abort(404)
    return jsonify(my_query);

@app.route('/film/<int:film_id>', methods=['PUT'])
@auth.login_required
def update_film(film_id):
    conn = connectToDB()
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    film_title = request.json.get('title',"")
    print(film_title)
    try:
        cur.execute("""UPDATE testing_schema_pedro.computers SET room_name=%s WHERE id=%s""", (film_title, film_id))
    except:
        print("ERROR Updating film")
        conn.rollback()

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
