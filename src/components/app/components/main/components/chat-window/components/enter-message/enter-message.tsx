import React from "react";
import { useContext } from "react";
import { Context } from "../../../../../../../..";

import "./enter-message.less";

const EnterMessage = () => {
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