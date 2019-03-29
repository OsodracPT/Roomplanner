# Flask Web API


## Getting started
Flask is a micro-framework written in Python and based on the Werkzeug and Jinja2 template engine for developing web applications. It is intended for developing web apps quickly. This guide will take you through setting up a flask application to work with Apache as the web server alongside its virtual environment and the respective environment variables.

### How To Deploy a Flask Application on Apache

Navigate into your app destination directory
```
cd /var/www
```
Create a directory FlaskApp by giving following command:
```
mkdir FlaskApp
```

Move inside this directory and create your flask app file.
```
cd FlaskApp
nano app.py
```

*app.py*

```python
from flask import Flask
app = Flask(__name__)
@app.route("/")
def hello():
    return "Hello, World!"
if __name__ == "__main__":
    app.run()
```
#### Installing Flask 

We will use pip to install virtualenv and Flask. If pip is not installed, install it on Ubuntu through apt-get.
```
apt-get install python3-pip
```

If virtualenv is not installed, use apt-get to install it using following command:
```
apt-get install python3-virtualenv
```

Give the following command (where env is the name you would like to give your temporary environment; -p /usr/bin/python3 selects the python version you wish to use):
```
python3 -m virtualenv -p /usr/bin/python3 env
```

Now, install Flask in that environment by activating the virtual environment with the following command:
```
source venv/bin/activate
```

Give this command to install Flask inside:
```
pip3 install Flask 
```
Next, run the following command to test if the installation is successful and the app is running:
```
python app.py
```
It should display “Running on http://localhost:5000/” or "Running on http://127.0.0.1:5000/". If you see this message, you have successfully configured the app.
To deactivate the environment, give the following command:
```
deactivate
```
#### Install and Enable mod_wsgi

Open terminal and type the following command to install mod_wsgi:
```
apt-get install libapache2-mod-wsgi-py3
```
To enable mod_wsgi, run the following command:
```
a2enmod wsgi
```
#### Configure and Enable a New Virtual Host

Issue the following command in your terminal:
```
nano /etc/apache2/sites-available/FlaskApp.conf
```
Add the following lines of code to the file to configure the virtual host. Be sure to change the ServerName to your domain or cloud server's IP address:

```
<VirtualHost *:80>

                ServerName myapp.com
                ServerAdmin webmaster@myapp.com

                # If you want to use environment variables inside your flask application you will need to  
                # set them first on the apache config and then pass them over the wsgi file.
                SetEnv APP_SETTINGS {{APP_SETTINGS}}
                SetEnv SECRET {{SECRET}}
                SetEnv CONN_STRING {{CONN_STRING}}

                WSGIScriptAlias / /var/www/html/FlaskApp/flaskapp.wsgi
                
                # Add the following line if you wish to use the Flask-HTTPAuth extension
                # https://flask-httpauth.readthedocs.io/en/latest/
                WSGIPassAuthorization On

                <Directory /var/www/FlaskApp/>
                        Order allow,deny
                        Allow from all
                </Directory>

                ErrorLog ${APACHE_LOG_DIR}/error.log
                LogLevel warn
                CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
```


Save the file.
Enable the virtual host with the following command:
```
a2ensite FlaskApp
```
Disable the default apache virtual host with the following command:
```
a2dissite 000-default.conf
```

#### Create the .wsgi File
Apache uses the .wsgi file to serve the Flask app. Move to the /var/www/FlaskApp directory and create a file named flaskapp.wsgi with following commands:
```
cd /var/www/FlaskApp
sudo nano flaskapp.wsgi 
```
Add the following lines of code to the flaskapp.wsgi file:

```python
#!/usr/bin/python
import sys
import logging
import os
basedir = os.path.abspath(os.path.dirname(__file__))
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/FlaskApp/")

# Add the following lines in order to use the virtual environment over apache
activate_this = '/var/www/FlaskApp/env/bin/activate_this.py'
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))


# Add the following method if you need to get the apache environment variables that we previosly set in the FlaskApp.conf file
def application(environ, start_response):
    for key in ['CONN_STRING', 'SECRET', 'APP_SETTINGS', ]:
        os.environ[key] = environ.get(key, '')
    from app import app as _application

    return _application(environ, start_response)

```
If you don't need to use a virtual enviroment or environment variables, simply add the following line at the end of the file.

**flaskapp.wsgi**
```python
  from app import app as _application
```
Finally restart Apache with the following command to apply the changes:
```
service apache2 restart 
```
## Deployment

Check the room planner ansible role for a list of tasks.

## Running unit tests



## Further help

To get more help on the project contact Pedro at pe278@maths.cam.ac.uk

## References
[How To Deploy a Flask Application on an Ubuntu VPS](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-flask-application-on-an-ubuntu-vps)

[How To Deploy a Python Flask Application with apache and mod_wsgi](http://fosshelp.blogspot.com/2014/03/how-to-deploy-flask-application-with.html)

[Passing Apache Environment Variables to Django via mod_wsgi](http://ericplumb.com/blog/passing-apache-environment-variables-to-django-via-mod_wsgi.html)

[Deploying a Flask application on Apache](https://software.saao.ac.za/2014/10/29/deploying-a-flask-application-on-apache/)