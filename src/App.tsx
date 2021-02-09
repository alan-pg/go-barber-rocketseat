import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global'

import Routes from './routes';

import AppPovider from './hooks';

const App: React.FC = () => (
    <BrowserRouter>
        <AppPovider>
            <Routes />
        </AppPovider>

        <GlobalStyle />
    </BrowserRouter>    
);

export default App;
