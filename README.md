# user_management_system

## Description

A user management web application with frontend (React) and backend (Django and DRF) components. The project adheres to industry best practices for security, performance, and code organization. It employs a range of technologies to deliver a reliable and efficient user experience.

## .env example for Db

```
DB_ENGINE=django.db.backends.postgresql
DB_NAME=
POSTGRES_USER=
POSTGRES_PASSWORD=
DB_HOST=
DB_PORT=
```
## Launch

```
cd infra/
docker-compose up --build
```
### Available endpoints

[Swagger](http://localhost:8000/swagger/) + frontend at localhost:3000

### To create a superuser

```
docker-compose exec backend python manage.py createsuperuser
```

### To stop the containers

```
docker-compose down -v
```
