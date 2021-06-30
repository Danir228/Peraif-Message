import React from 'react';
import { Message } from '../../chat-window';
import './message-item.less';

interface MessageItemProps {
    message: Message;
}

/**
 * Производит рендер блока, содержащий имя пользователя, сообщение и время отправки сообщения
 * @param {message} - содержит, message.name(имя пользователя), message.text(сообщение) и message.time(время отправки сообщения)
 */

const MessageItem = ({ message }: MessageItemProps) => {
    /**
     * Переменная time, которой приваивается значение в виде тернарной операции, где:
     * Если message.time будет true, то вызывается конструктор new Date(message.time.seconds-время в секундах * 1000).toLocaleTimeString-метод, которой передается соглашение о локали "ru"
     * Если будет false, передается null
     */
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