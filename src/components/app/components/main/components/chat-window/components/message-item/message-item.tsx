import React from 'react';
import { Message } from '../../chat-window';
import './message-item.less';

interface MessageItemProps {
    message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
    const time = message.time ? new Date(message.time.seconds * 1000).toLocaleTimeString("ru") : null;
    return (
        <div className="message-item">
            <div className="message-item__body">
                <h3 className="message-item__title">{message.name}</h3>
                <p className="message-item__text">{message.text}</p>
                <p className="message-item__text">{time}</p>
            </div>
        </div>
    )
}

export default MessageItem;