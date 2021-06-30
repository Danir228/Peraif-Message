import React from 'react';
import ChatWindow from './components/chat-window/chat-window';

import './main.less';

const Main = () => {
    return (
        <main className="main">
            <div className="container">
                <div className="main__wrapper">
                    <ChatWindow />
                </div>
            </div>
        </main>
    )
}

export default Main;