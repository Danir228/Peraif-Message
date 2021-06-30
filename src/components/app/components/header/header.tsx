import React from 'react';

import './header.less';

/**
 * Рендерит шапку сайта с логотипом
 */

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__items">
                    <div className="header__logo"></div>
                </div>
            </div>
        </header>
    )
}

export default Header;