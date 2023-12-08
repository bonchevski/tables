# Frontend App:


Note: The FE project has been created with Node v 18.16.0

## Install the required packages:

Clone:
```bash
    https://github.com/bonchevski/tables.git
```
Navigate to the FE root project folder:
```bash
cd tables/ordersFE
```
And run the following commands within tables/ordersFE:

```bash
npm install
```

## Run the project:

```bash
npm run dev
```

FE app available at:  http://localhost:5173/


# Backend App:
## Install the required packages:

Ensure that you have Python and pip installed on your system. If not, you can download and install Python from the official Python website.
Ensure that you have django installed

Or create a venv [this]:https://www.javatpoint.com/django-virtual-environment-setup shows how.


Navigate to the BE root project folder:

```bash
cd tables/ordersBE
```

And run the following commands within tables/ordersBE:

```bash
pip install -r requirements.txt
```
## Database Setup
Apply migrations:

```bash
python manage.py migrate
```
## Create a superuser:
```bash
python manage.py createsuperuser
```
Follow the prompts to create a superuser account. This account can be used to access the Django admin interface.

Run the Development Server
Start the development server:

```bash
Copy code
python manage.py runserver
```
Access the Django admin interface at http://127.0.0.1:8000/admin/ using the superuser credentials.
