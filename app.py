"""
Application for simulating a Slack-like messaging interface. Users can 
view/send messages in different channels and create new channels. 

Date last modified: May 26, 2020
"""

import json
from flask import Flask, request, render_template
from db import db, User
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


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/user/", methods=["POST"])
def user():
    # get form info
    display_name = request.form.get("displayName")
    # check if display name is already taken
    if User.query.filter_by(display_name=display_name).count() != 0:
        return render_template("index.html", message="That display name is already taken.")
    new_user = User(display_name=display_name)
    db.session.add(new_user)
    db.session.commit()
    return render_template("user.html", name=display_name)





app.run()
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)