import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import FolderPage from './FolderPage/FolderPage';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote'
import config from './config'
import NotePage from './NotePage/NotePage';
import ErrorComponent from './ErrorComponent/ErrorComponent';



class App extends React.Component {
  
  render() {
    
    return (
      <main className='App'>
        <ErrorComponent>
            <Switch>
              <Route 
                exact path="/" 
                component={MainPage}
              />
              <Route 
                path="/folders/:folderId" 
                component={FolderPage}
              />
              <Route 
                path="/notes/:noteId" 
                component={NotePage}
              />
              <Route 
                path="/addFolder"
                component={AddFolder}
              />
              <Route 
                path="/addNote"
                component={AddNote}
              />
              <Route 
                path="/error"
                component={ErrorComponent}
              />
            </Switch>
          </ErrorComponent>
      </main>
    );
  }
}

export default App;