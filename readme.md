# Frontend App:


Note: The FE project has been created with Node v 18.16.0

## Install the required packages:

```bash
npm install
```

## Run the project:

```bash
npm run dev
```


# Backend App:
## Install the required packages:

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
