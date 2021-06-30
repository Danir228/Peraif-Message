import React from 'react';
import Header from './components/header/header';
import Main from './components/main/main';

import "./app.less";

/**
 * Рендерит компонент Header(шапка страницы, где отображается логотип),
 * Рендерит компонент Main(основная часть страницы, список сообщений, формы для сообщений и имени, кнопка отправки сообщения)
 */

const App = () => {
    return (
        <div className="app" >
            <Header />
            <Main />
        </div>
    )
}

export default App;