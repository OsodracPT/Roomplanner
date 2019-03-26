#!/usr/bin/python
import sys
import logging
import os

#basedir = os.path.abspath(os.path.dirname(__file__))

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR)

activate_this = '/var/www/html/roomplanner/backend/env/bin/activate_this.py'
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))

logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/html/roomplanner/backend/")

def application(environ, start_response):
    for key in ['DATABASE_URL', 'CONN_STRING', 'SECRET', 'APP_SETTINGS', ]: 
        os.environ[key] = environ.get(key, '')
        print(os.environ[key])
    from app import app as _application

    return _application(environ, start_response)
