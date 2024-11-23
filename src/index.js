import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from "./components/LoginComponent.tsx";
import NotFound from "./components/NotFoundComponent";
import MarketComponent from "./components/MarketComponent.tsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="*" element={<NotFound />} />
            <Route path="/market" element={<MarketComponent/>}/>
        </Routes>
    </BrowserRouter>
);

