import React from 'react';
import Authentication from './Authentication';
import Jumbotron from 'react-bootstrap/Jumbotron';

export default () => {
    return (
        <div>
            <Jumbotron id="jumbotron">
                <h1 className="logo">Cloud Chat</h1>
                <div className="home-divider"></div>
                <p className="app-description">
                    It's like texting, but better.
                    <br></br>
                    Organize messages into different channels, and create
                    and subscribe to different channels at any time.
                </p>

                <div id="home-auth">
                    <Authentication id="home-auth" />
                </div>


            </Jumbotron>


            <img className="home-img" src={require('./images/home_image.png')}
                alt="Guy Holding Phone"></img>
        </div>
    )
}