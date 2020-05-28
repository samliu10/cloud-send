"""
Database that uses SQLAlchemy to interact with application app.py
via object relational mapping. 

Defines classes User, Channel, and Message.

Date last modified: May 26, 2020
"""
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
import datetime
from sqlalchemy.sql import func

class User(db.Model):
    """
    Defines a User.

    Fields:
    1) display_name: the user's display name
    2) username: the user's username
    3) password: the user's password (hashed)
    """
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    display_name = db.Column(db.String, nullable=False, unique=True)
    # username password has not been implemented yet
    # username = db.Column(db.String, nullable=False, unique=True)
    # password = db.Column(db.String, nullable=False)


    def serialize(self):
        """
        Converts a User object into a json.
        """
        return {
            "id": self.id, 
            "display_name": self.display_name,
            # "username": self.username, 
            # "password": self.password
        }


class Channel(db.Model):
    """
    Defines a Channel.

    Fields:
    1) name: the channel's name
    2) messages: the messages associated with the channel
    """
    __tablename__ = "channels"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    # define reverse side of Channel/Message relationship
    # if a channel is deleted, all associated messages are deleted
    messages = db.relationship("Message", cascade="delete")


    def serialize(self):
        """
        Converts a Channel object into a json.
        """
        return {
            "id": self.id, 
            "name": self.name, 
            "messages": [m.serialize for m in self.messages]
        }


class Message(db.Model):
    """
    Defines a Message.

    Fields:
    1) author: the display name of the user that wrote this message
    2) time: the time the message was sent
    3) content: the content of the message
    4) channel_id: the channel the message was sent in
    """
    __tablename__ = "messages"
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String, nullable=False)
    time = db.Column(db.DateTime(timezone=True), server_default=func.now())
    content = db.Column(db.String, nullable=False)
    # db.ForeignKey("<tablename>.<field>") defines Channel/Message relationship
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)


    def serialize(self):
        """
        Converts a Message object into a json.
        """
        return {
            "id": self.id, 
            "author": self.author, 
            "time": self.time, 
            "content": self.content, 
            "channel_id": self.channel_id
        }