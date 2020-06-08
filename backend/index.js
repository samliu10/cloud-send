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

// returns array of documents. doc.data() returns json
const getMessagesHelper = (channel, array, doc_list) => {
    for (let doc of doc_list.docs) {
        let item = doc.data();
        if (channel === item.channel) array.push(doc);
    }
    return array;
}

// socket.io config
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// runs whenever a client establishes a web socket connection
io.on('connection', (client) => {
    console.log('a user connected'); // remove this later

    // assume data is a json 
    client.on('message', (data) => {
        console.log('Message received', data);

        // store that message in db
        const channel_name = data.channel;
        new_message = db.collection(channel_name).doc();
        new_message.set(data);

        // emits data back to all users on chat channel
        io.emit('message', data);
    });

})

// get all channel names
app.get('/getallchannels/', async (req, res) => {
    const channels = await db.collection("channels").get();
    res.status(200).json({ channels: channels });
})

// get all users
app.get('/getallusers/', async (req, res) => {
    const users = await db.collection("users").get();
    res.status(200).json({ users: users });
})

// get all messages in a channel 
app.get('/getmessages/:channel', async (req, res) => {
    const channel = req.params.channel;
    const messages = await db.collection("messages").orderBy("time").get();
    const array = [];
    res.status(200).json(getMessagesHelper(channel, array, messages).map(
        (item) => ({ ...item.data })
    ));
})

server.listen(port, () => console.log(`Listening on port ${port}!`));
app.listen(port, () => console.log(`Listening on port ${port}!`));
