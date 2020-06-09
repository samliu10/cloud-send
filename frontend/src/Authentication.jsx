import React, { useState } from 'react';
import 'firebase/auth';
import * as firebase from 'firebase/app';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import { useEffect } from 'react';

// firebase app config 
const firebaseConfig = {
    apiKey: "AIzaSyCWFDecU1maBwrZPeqQlSjS42TaMOqRiQs",
    authDomain: "cloud-chat-1558.firebaseapp.com",
    databaseURL: "https://cloud-chat-1558.firebaseio.com",
    projectId: "cloud-chat-1558",
    storageBucket: "cloud-chat-1558.appspot.com",
    messagingSenderId: "543189722811",
    appId: "1:543189722811:web:67bc902605253df3612b9e",
    measurementId: "G-TK5PM2XJ78"
};

firebase.initializeApp(firebaseConfig);

export default (props) => {
    const [user, setUser] = useState(null);

    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    };

    function onAuthStateChange() {
        return firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
        });
    }

    useEffect(() => onAuthStateChange(), []);

    return (
        <div>
            {user && props.children}
            {!user && (
                <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            )}
        </div>
    );
};