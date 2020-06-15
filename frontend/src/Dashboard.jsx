import React, { useState } from 'react';
import Authentication from './Authentication';
import Channel from './Channel';
import NavBar from './NavBar';

const [currChannel, setCurrChannel] = useState("");

const changeChannel = (newChannel) => {
    setCurrChannel(newChannel);
}

export default () => {
    return (
        <div>
            <NavBar currChannel={currChannel} changeChannel={changeChannel} />
            <Channel currChannel={currChannel} changeChannel={changeChannel} />

        </div>
    )
}