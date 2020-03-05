FROM python:3.6

LABEL maintainer "Pedro Cardoso <pec121@student.anglia.ac.uk>"

RUN apt-get update

RUN mkdir /usr/src/backend

WORKDIR /usr/src/backend

COPY backend/ /usr/src/backend

RUN pip install --no-cache-dir -r requirements.txt

ENV APP_SETTINGS="development" TEST_SETTINGS="testing" CONN_STRING="host='postgres' dbname='roomplanner' user='_roomplanner' password='password'" SECRET="SimpleSecret"

EXPOSE 5000

ENTRYPOINT [ "python3" ]
CMD [ "app.py" ]