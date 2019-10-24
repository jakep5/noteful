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
          render = {({history}) => {
            return(
              <MainPage  
                onClickTitle = {() => history.push("/")}/>
          )}} />
        <Route 
          path="/folders/:folderId" 
          render = {({history}) => {
            return (
              <FolderPage 
                onClickTitle = {() => history.push("/")}/>
            )}} />
        <Route 
          path="/notes/:noteId" 
          render = {({history}) => {
            return (
              <NotePage 
                onClickBack = {() => history.goBack()} 
                onClickTitle = {() => history.push("/")}/>
            )
          }}/>
      </Switch>
    </main>
  );
}

export default App;