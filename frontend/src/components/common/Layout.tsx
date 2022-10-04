import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import Main from './Main';

export const Layout: React.FC = () => {
    return (
        <div>
            <ToastContainer />
            <Header></Header>
            <Main></Main>
        </div>
    );
}