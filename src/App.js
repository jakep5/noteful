import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import FolderPage from './FolderPage/FolderPage';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote'
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
                render={() => (
                  <ErrorComponent>
                    <MainPage/>
                  </ErrorComponent>
                )}
              />
              <Route 
                path="/folders/:folderId" 
                render={() => (
                  <ErrorComponent>
                    <FolderPage/>
                  </ErrorComponent>
                )}
              />
              <Route 
                path="/notes/:noteId" 
                render={() => (
                  <ErrorComponent>
                    <NotePage/>
                  </ErrorComponent>
                )}
              />
              <Route 
                path="/addFolder"
                render={() => (
                  <ErrorComponent>
                    <AddFolder/>
                  </ErrorComponent>
                )}
              />
              <Route 
                path="/addNote"
                render={() => (
                  <ErrorComponent>
                    <AddNote/>
                  </ErrorComponent>
                )}
              />
            </Switch>
          </ErrorComponent>
      </main>
    );
  }
}

export default App;