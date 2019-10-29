import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {NotesProvider} from './NotesContext/NotesContext';
import './index.css';


ReactDOM.render(
    <BrowserRouter>
        <NotesProvider>
            <App/>
        </NotesProvider>    
    </BrowserRouter>, 
    document.getElementById('root')
);