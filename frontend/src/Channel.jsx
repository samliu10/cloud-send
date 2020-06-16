import React from 'react';
import ChannelAbout from './ChannelAbout';
import MessageHistory from './MessageHistory';
import NewMessage from './NewMessage';

export default ({ currChannel, changeChannel }) => {

    const addMessage = (message) => [
        // do post request here
    ]

    // get channel name, description from backend
    // get messages from a channel
    // render channel name at the top

    return (
        <div>
            <ChannelAbout channelName={channelName} channelDesc={channelDesc} />
            <MessageHistory messages={messages} />
            <NewMessage addMessage={addMessage} />

        </div>
    )

}