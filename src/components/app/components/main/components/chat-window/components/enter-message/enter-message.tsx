import React from "react";
import { useContext } from "react";
import { Context } from "../../../../../../../..";

import "./enter-message.less";

/**
 * Рендерит input для ввода сообщения, input для ввода имени пользователя и кнопку для отправки сообщения
 */

const EnterMessage = () => {
    /**
     * Получаем переменные(value, name) и функции(setValue, setName, sendMessage) через контекст используя хук useContext
     * Перменная состояния value для сообщения пользователя, функция для обновления переменной value - setValue
     * Перменная состояния name для имения пользователя, функция для обновления переменной name - setName
     * Функция для отправки сообщения - sendMessage
     */
    const { value, setValue, name, setName, sendMessage } = useContext(Context);
    return (
        <div className="enter-message">
            <input
                className="enter-message__input"
                type="input"
                placeholder="Написать сообщение..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <label id="user-name" >Введите имя: </label>
            <input
                id="user-name"
                className="enter-message__input_name"
                type="input"
                placeholder="Имя..."
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button
                className="enter-message__button"
                type="button"
                style={{ opacity: `${value.length > 0 ? 1 : 0}` }}
                onClick={() => sendMessage()}
            >
                отправить
            </button>
        </div>
    );
};

export default EnterMessage;