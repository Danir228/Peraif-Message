import React, { createContext } from 'react';
import { render } from 'react-dom';
import App from './components/app/app';
import firebase from 'firebase/app';
import 'firebase/firestore'

import "../src/components/styles/general.less";
import "../src/components/styles/reset.less";

/**
 * firebase - Облачная база данных, initializeApp - Создает и инициализирует экземпляр приложения
 * @param {object} - обьект с ключами и идентификаторами
 */


firebase.initializeApp(
    {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID
    }
);

/**
 * Переменная firestore, получает доступ к базе данных firestore
 */

const firestore = firebase.firestore();

/**
 * Экспорт переменной Context, которой присваивается обьект Context
 */

export const Context = createContext<any>(null);

/**
 * Оборачивает компонент App(Основной компонент) в Context.Provider и рендерит внутри элемента по айди #root
 */

render(
    <Context.Provider value={{
        firebase,
        firestore
    }}>
        <App />
    </Context.Provider>
    ,
    document.getElementById('root')
);