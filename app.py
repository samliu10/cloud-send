"""
Application for simulating a Slack-like messaging interface. Users can 
view/send messages in different channels and create new channels. 

Date last modified: May 26, 2020
"""

import json
from flask import Flask, request, render_template
from db import db
import csv

# define db filename
db_filename = "database.db"
app = Flask(__name__)

# setup config
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_filename}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True

# initialize app
db.init_app(app)
with app.app_context():
    db.create_all()