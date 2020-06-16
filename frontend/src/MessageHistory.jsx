import React from 'react';
import Message from './Message';

export default ({ messages }) => {

    // for each message, return a Message component with unique key value

    return (
        <div>

            {messages.map((message, index) => <div><Message key={index} {...message} /></div>)}

        </div>
    )
}