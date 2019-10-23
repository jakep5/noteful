import React from 'react';
import { Router, Switch } from 'react-router-dom';
import MainPage from './MainPage/MainPage';

function App() {
  return (
    <main className='App'>
      <Switch>
        <Route exact path="/" component = {MainPage}/>
        <Route path="/folders" component = {FolderPage} />
        <Route path="/notes" component = {NotePage} />
      </Switch>
    </main>
  );
}

export default App;