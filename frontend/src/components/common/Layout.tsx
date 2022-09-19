import React from 'react';
import Header from './Header';
import Main from './Main';

export const Layout: React.FC = () => {
    return (
        <div>
            <Header></Header>
            <Main></Main>
        </div>
    );
}