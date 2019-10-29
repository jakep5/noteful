import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import FolderPage from './FolderPage/FolderPage';
import AddFolder from './AddFolder/AddFolder';
import config from './config'
import NotePage from './NotePage/NotePage';



class App extends React.Component {
  
  render() {
    
    return (
      <main className='App'>
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
          </Switch>
      </main>
    );
  }
}

export default App;