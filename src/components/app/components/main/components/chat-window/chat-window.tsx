import React, { useEffect } from 'react';
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

const ChatWindow = () => {
    const { firestore } = useContext(Context);
    const [value, setValue] = useState('');
    const [name, setName] = useState('')
    const [messages, loading] = useCollectionData<Message>(
        firestore.collection("message").orderBy("time", "asc")
    )
    const refMessages = useRef<HTMLDivElement>(null);

    const scrollDown = () => {
        if (refMessages.current && messages) {
            refMessages.current.scrollTop = refMessages.current.scrollHeight;
        }
    }

    const sendMessage = async () => {
        await firestore.collection('message').add({
            name: name.length === 0 ? "User" : name,
            text: value,
            time: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('');
        scrollDown();
    }

    if (loading) {
        return <div style={{ height: "100vh", width: "100%", textAlign: "center" }}>Loading...</div>
    }

    return (
        <Context.Provider value={{
            value, setValue, name, setName, sendMessage, scrollDown
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

