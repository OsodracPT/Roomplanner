from app import app
import os
import base64
from config import app_config
import unittest

class BasicTestCase(unittest.TestCase):

    def test_index(self):
        tester = app.test_client(self)
        response = tester.get('/', content_type='html/text')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, b'Roomplanner Flask API!')
    
    def setUp(self):
        config_name = os.getenv('TEST_SETTINGS') # config_name = "development"
        # app.config.from_object(app_config[config_name])
        app.config['TESTING'] = True
        self.app = app.test_client()
        self.valid_credentials = base64.b64encode(os.getenv('API_CREDS').encode()).decode('utf-8')
        self.invalid_credentials = base64.b64encode(b'mojo:python').decode('utf-8')

    def test_rooms_can_be_retrieved_when_correct_credentials_are_entered(self):
        response = self.app.get('/rooms', headers={'Authorization': 'Basic ' + self.valid_credentials})
        self.assertEqual(response.status, '200 OK')

    def test_rooms_cant_be_retrieved_when_incorrect_credentials_are_entered(self):
        response = self.app.get('/rooms', headers={'Authorization': 'Basic ' + self.invalid_credentials})
        self.assertEqual(response.status, '403 FORBIDDEN')
    
    def test_rooms_cannt_be_retrieved_when_sql_injection_is_entered(self):
        response = self.app.get('/rooms/pav/0 OR 1=1', headers={'Authorization': 'Basic ' + self.valid_credentials})
        self.assertEqual(response.status, '200 OK')
        self.assertEqual(response.data, b'[]\n')
    
    def test_pav_rooms_can_be_retrieved_when_correct_credentials_are_entered(self):
        response = self.app.get('/rooms/pav/C', headers={'Authorization': 'Basic ' + self.valid_credentials})
        self.assertEqual(response.status, '200 OK')
    def test_room_can_be_retrieved_when_correct_credentials_are_entered(self):
        response = self.app.get('/rooms/1', headers={'Authorization': 'Basic ' + self.valid_credentials})
        self.assertEqual(response.status, '200 OK')
    def test_room_can_be_retrieved_with_number_when_correct_credentials_are_entered(self):
        response = self.app.get('/rooms/room_number/CL0.01', headers={'Authorization': 'Basic ' + self.valid_credentials})
        self.assertEqual(response.status, '200 OK')
    def test_room_computers_can_be_retrieved_when_correct_credentials_are_entered(self):
        response = self.app.get('/rooms/1/computers', headers={'Authorization': 'Basic ' + self.valid_credentials})
        self.assertEqual(response.status, '200 OK')
    def test_room_people_can_be_retrieved_when_correct_credentials_are_entered(self):
        response = self.app.get('/rooms/1/persons', headers={'Authorization': 'Basic ' + self.valid_credentials})
        self.assertEqual(response.status, '200 OK')
    def test_room_computers_can_be_retrieved_with_number_when_correct_credentials_are_entered(self):
        response = self.app.get('/rooms/room_number/CL0.01/computers', headers={'Authorization': 'Basic ' + self.valid_credentials})
        self.assertEqual(response.status, '200 OK')
    def test_room_people_can_be_retrieved_with_number_when_correct_credentials_are_entered(self):
        response = self.app.get('/rooms/room_number/CL0.01/persons', headers={'Authorization': 'Basic ' + self.valid_credentials})
        self.assertEqual(response.status, '200 OK')


    def test_computers_can_be_retrieved_when_correct_credentials_are_entered(self):
        response = self.app.get('/computers', headers={'Authorization': 'Basic ' + self.valid_credentials})
        self.assertEqual(response.status, '200 OK')
    def test_pav_computers_can_be_retrieved_when_correct_credentials_are_entered(self):
        response = self.app.get('/computers/pav/C', headers={'Authorization': 'Basic ' + self.valid_credentials})
        self.assertEqual(response.status, '200 OK')
    def test_computer_can_be_retrieved_when_correct_credentials_are_entered(self):
        response = self.app.get('/computers/1', headers={'Authorization': 'Basic ' + self.valid_credentials})
        self.assertEqual(response.status, '200 OK')

    def test_persons_can_be_retrieved_when_correct_credentials_are_entered(self):
        response = self.app.get('/persons', headers={'Authorization': 'Basic ' + self.valid_credentials})
        self.assertEqual(response.status, '200 OK')
    def test_person_can_be_retrieved_when_correct_credentials_are_entered(self):
        response = self.app.get('/persons/1', headers={'Authorization': 'Basic ' + self.valid_credentials})
        self.assertEqual(response.status, '200 OK')
    def test_pav_person_can_be_retrieved_when_correct_credentials_are_entered(self):
        response = self.app.get('/persons/pav/C', headers={'Authorization': 'Basic ' + self.valid_credentials})
        self.assertEqual(response.status, '200 OK')

if __name__ == '__main__':
    unittest.main()