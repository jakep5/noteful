import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import FolderPage from './FolderPage/FolderPage';
import NotePage from './NotePage/NotePage';
import NotesContext from './NotesContext/NotesContext';


class App extends React.Component {
  render() {
    return (
      <main className='App'>
        <NotesContext.Provider>
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
        </NotesContext.Provider>
      </main>
    );
  }
}

export default App;