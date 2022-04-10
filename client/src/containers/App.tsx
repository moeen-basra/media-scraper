import React from 'react';
import {Header, Footer} from '../components'
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';

export default () => {
    return (
        <>
            <BrowserRouter>
                <Header/>
                <main className="mt-20" role="main">
                    <Routes/>
                </main>
                <Footer/>
            </BrowserRouter>
        </>
    );
}

