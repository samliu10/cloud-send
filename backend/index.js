/*
Backend routes for Cloud-Chat, a Slack-like messaging web application.
Database is hosted by Google Firebase.

Date last modified: June 2, 2020

*/

// firebase and backend config
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");
const express = require('express');
const bodyParser = require('body-parser');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cloud-chat-1558.firebaseio.com"
});

const db = admin.firestore();
const app = express();
const port = 8080;
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}!`));