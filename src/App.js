import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import FolderPage from './FolderPage/FolderPage';
import NotePage from './NotePage/NotePage';
import NotesContext from './NotesContext/NotesContext';


class App extends React.Component {
  state ={
    notes: [],
    folders: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT/notes}`),
      fetch(`${config.API_ENDPOINT/folders}`)
    ])
      .then(([notesResponse, foldersResponse]) => {
        if (!notesResponse.ok)
          return notesResponse.json().then(e=>Promise.reject(e));
        if (!foldersResponse.ok)
          return foldersResponse.json().then(e=>Promise.reject(e))
        
        return (Promise.all([notesResponse.json(), foldersResponse.json()]));
      })

  }
  render() {
    const contextValue = {

    }
    return (
      <main className='App'>
        <NotesContext.Provider>
          <Switch>
            <Route 
              exact path="/" 
              component={<MainPage  
                    onClickTitle = {() => history.push("/")}/>}
            />
            <Route 
              path="/folders/:folderId" 
              component = { <FolderPage 
                onClickTitle = {() => history.push("/")}/>}
            />
            <Route 
              path="/notes/:noteId" 
              component= {<NotePage 
                    onClickBack = {() => history.goBack()} 
                    onClickTitle = {() => history.push("/")}/>}
            />
          </Switch>
        </NotesContext.Provider>
      </main>
    );
  }
}

export default App;