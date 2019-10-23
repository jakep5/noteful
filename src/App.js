import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import FolderPage from './FolderPage/FolderPage';
import NotePage from './NotePage/NotePage';


function App() {
  return (
    <main className='App'>
      <Switch>
        <Route 
          exact path="/" 
          render = {() => {
            return(
            <MainPage  />
          )}} />
        <Route path="/folders" component = {FolderPage} />
        <Route path="/notes" component = {NotePage} />
      </Switch>
    </main>
  );
}

export default App;