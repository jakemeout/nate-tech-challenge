## Parse-a-page | nate-tech-challenge

### Parse-a-page is a fullstack single page application that will parse text from a website and return a wordcount analysis. The application will also save a history of submittals.

<br/>

## Tech Stack

### I built this application using JS-React as the front end and a Python-Flask-sqlalchemy backend utilizing selenium weeb drivers to simulate opening a chrome page for the application to parse the text of that page.

<br/>

## Why did I choose this stack?

### I chose this stack because I have recently been learning Python and am new to Flask, I used this challenge as an opportunity to learn more Python syntax and learn how to use Flask with sqlalchemy as well as Selenium. I also was aware that Flask was light wieght and similar to Node/Express which I am already familiar with.

## DEMO

### Getting the first result (Sorted by key values greatest occurence to least)
![](NateChallengeGif.gif)
<br/>

### On page load, grabs history of searchs/submittals from the backend endpoint and returns the resutls with created date. A user can also search through results with filter. Results are ordered by creation/submitted at time.

![](NateChallengeGif2.gif)

<br>

## Clone the REPO
Navigate to a directory on your local machine and clone the repo - `git clone https://github.com/jakemeout/nate-tech-challenge.git`

## Frontend Setup

1. Navigate to the client/ folder in your terminal and run the command `npm install`.
2. Once the packages are installed you can run `npm start`.

That's it for the Front End!

## Backend Setup

NOTE: If you do not have postgresql installed, please install it with homebrew https://www.postgresql.org/download/macosx/. Another resource to summarize this installation is here https://flaviocopes.com/postgres-how-to-install/.

1. Navigate to server/ folder within this project. Create a folder at the root of the server directory called venv for your virtual environment. `python3 -m venv venv`
2. Next activate your environment with `. venv/bin/activate`
3. Now you can check to make sure you are in your environment with the command `which python3` you will notice this is a different directory from where your python interpreters directory is created. 
4. Install all the packages! `pip install -r requirements.txt`
5. Create a new local DB in postgres: 
```
psql postgres
postgres=# create database natetechdb;
postgres=# create user owner_name with password 'db_password';
postgres=# grant all privileges on database natetechdb to owner_name;
```
6. Create a .env file to store the environment variable for FLASK and your postgres information. It should look like this(use the variable names as the configuration looks for this) 

```FLASK_ENV=development
DB_DEV_USERNAME=owner_name
DB_DEV_PASSWORD=db_password
DB_DEV_NAME=natetechdb
DB_DEV_HOSTNAME=localhost
DB_DEV_PORT=5432
```

7. Create migrations and tables. `python3 manage.py db init', then `python3 manage.py db migrate`, then ` python3 manage.py db upgrade` 
8. If you haven't had any errors (really hoping this went smoothly...) You should be able to run the app! You can do this by running `python3 app.py`

Results may vary with instructions as I am still very new to python. I have aliased my `pip3` and `python3` to `pip` and `python` in my `~./zhshrc` file. NOTE also, I have PYTHONPATH configured in my `~./zhshrc` file as well to make it easier to find modules and packages or custom libraries.

Please follow up with any questions by emailing me at [Jhyde@me.com](mailto:jhyde@me.com)

Thank you for reading and playing with the app! 