import React from 'react';
import Header from './components/header/header';
import Main from './components/main/main';

import "./app.less";

const App = () => {
    return (
        <div className="app" >
            <Header />
            <Main />
        </div>
    )
}

export default App;