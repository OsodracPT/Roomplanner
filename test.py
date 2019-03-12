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
        self.assertEqual(response.data, b'Hello, World!')
    
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

if __name__ == '__main__':
    unittest.main()