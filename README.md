This is a sample ecommere site build with Django and React. The backend uses Django Rest Framework. Frontend is React. 

To get this sample project running, follow these steps:

```bash
# create a directory somewhere
$ mkdir <your dir name>

# open directory
$ cd <your dir name>

# clone repo into currenty directory
$ git clone https://github.com/tabdon/django-react-shop-full .

# setup a virtualenv
$ virtualenv venv

# activate virtualenv
$ source venv/bin/activate

# install requirements
$ pip install -r requirements.txt

# prepare django
$ python manage.py migrate
$ python manage.py loaddata core/fixtures/initial_data.json 
$ python manage.py createsuperuser

# start dev web server
$ python manage.py runserver
```

After following those steps you should be able to open http://127.0.0.1:8000 and demo the project.

*Note about Stripe*
If you want to demo the payment functionality you'll need to update the settings.py file with your Stripe API keys. Follow the steps above, then open /product_api/settings.py, locate STRIPE_SECRET_KEY & STRIPE_PUBLISHABLE_KEY, and update them to your keys.
