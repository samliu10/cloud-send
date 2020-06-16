import React, { useState } from 'react';
import Authentication from './Authentication';
import Channel from './Channel';
import NavBar from './NavBar';

export default () => {

    const [currChannel, setCurrChannel] = useState("");
    const [channels, setChannels] = useState([]);
    // each channel is a json containing channel name and channel description

    const changeChannel = (newChannel) => {
        setCurrChannel(newChannel);
    }

    const addChannel = (newChannelName, newChannelDesc) => {
        // post request to add channel
        // backend: make sure to return each channel with name = id and channel desc
        setChannels([...channels, { channelName: newChannelName, channelDesc: newChannelDesc }]);
        changeChannel(newChannelName); // change channel after making a new one

    }

    // get request to get channels
    // get user from firebase auth

    return (
        <div>
            <NavBar currChannel={currChannel} changeChannel={changeChannel}
                channels={channels} addChannel={addChannel} user={user} />
            <Channel currChannel={currChannel} changeChannel={changeChannel} />

        </div>
    )
}