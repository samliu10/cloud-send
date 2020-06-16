import React from 'react';
import ChannelList from './ChannelList';

export default ({ user, channels, currChannel, changeChannel, addChannel }) => {

    // display user info

    return (
        <div>
            <ChannelList currChannel={currChannel} changeChannel={changeChannel}
                addChannel={addChannel} channels={channels} />

        </div>
    )

}