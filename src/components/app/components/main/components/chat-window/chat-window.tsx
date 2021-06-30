import React from 'react';
import { useContext } from 'react';
import { Context } from '../../../../../..';
import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import EnterMessage from './components/enter-message/enter-message';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import MessageItem from './components/message-item/message-item';
import { useRef } from 'react';
import './chat-window.less';

export interface Message {
    name: string,
    time: Time,
    text: string;
}

export interface Time {
    seconds: number;
    nanoseconds: number;
}

/**
 * Рендерит список сообщений из MessageItem - компонент сообщения,
 компонент EnterMessage - форма ввода сообщения и имени пользователя, а также кнопка отправки сообщения
 * Передает через Context.Provider value - переменная состояния для сообщения,
 setValue - функция, которая обновляет value,
 name - переменная состояния для имени пользователя,
 setName- функция, которая обновляет name,
 sendMessage - функция, которая отправляет сообщение на сервер
*/

const ChatWindow = () => {
    /**
     * Получает firestore-(база данных NoSQL) через контекст, через хук useContext
     */
    const { firestore } = useContext(Context);
    /**
     * Переменная состояния value - получает сообщение пользователя, функция setValue обновляет value, через хук useState
     */
    const [value, setValue] = useState('');
    /**
     * Переменная состояния name - получает имя пользователя, функция setName обновляет name, через хук useState
     */
    const [name, setName] = useState('')
    /**
     * Переменная messages-массив с сообщениями, которые приходят с база данных firestore и сортируются по времени отправки orderBy
     * Переменная loading, дает информация о загрузке сообщений
     */
    const [messages, loading] = useCollectionData<Message>(
        firestore.collection("message").orderBy("time", "asc")
    )
    /**
     * Получает элемент DOM, через хук useRef
    */
    const refMessages = useRef<HTMLDivElement>(null);

    /**
     * Получает высоту блока и производит скролл вниз
    */

    const scrollDown = () => {
        if (refMessages.current && messages) {
            refMessages.current.scrollTop = refMessages.current.scrollHeight;
        }
    }

    /**
     * Отправляет сообщение на сервер, очищает инпут для написания сообщений-setValue, и вызывает функцию scrollDown-скролл вниз
    */

    const sendMessage = async () => {
        await firestore.collection('message').add({
            name: name.length === 0 ? "User" : name,
            text: value,
            time: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('');
        scrollDown();
    }

    /**
     * Условие, которое возвращает сообщение, что идет загрузка
     * @param {loading} - идет загрузка сообщений
     */

    if (loading) {
        return <div style={{ height: "100vh", width: "100%", textAlign: "center" }}>Loading...</div>
    }

    return (
        <Context.Provider value={{
            value, setValue, name, setName, sendMessage
        }}>
            <div className="chatwindow">
                <div className="chatwindow__messages" ref={refMessages}>
                    {messages?.map(message =>
                        <MessageItem key={Math.random()} message={message} />
                    )}
                    <div
                        className={"chatwindow__scroll"}
                        onClick={() => scrollDown()}
                    >
                        &#9660;
                    </div>
                </div>
                <EnterMessage />
            </div>
        </Context.Provider>
    )
}

export default ChatWindow;

