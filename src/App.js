import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import FolderPage from './FolderPage/FolderPage';
import config from './config'
import NotePage from './NotePage/NotePage';
import NotesContext from './NotesContext/NotesContext';


class App extends React.Component {
  state ={
    notes: [],
    folders: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesResponse, foldersResponse]) => {
        if (!notesResponse.ok)
          return notesResponse.json().then(e=>Promise.reject(e));
        if (!foldersResponse.ok)
          return foldersResponse.json().then(e=>Promise.reject(e))
        
        return (Promise.all([notesResponse.json(), foldersResponse.json()]));
      })
      .then(([notes, folders]) => {
        this.setState({notes, folders});
      })
      .catch(error => {
        console.error({error});
      })
  }

  handleDeleteNote = noteId => {
    this.setState({
          notes: this.state.notes.filter(note => note.id !== noteId)
      });
    };

  /* onClickTitle (){

  } */
  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      onClickTitle: this.onClickTitle
    }

    return (

      <main className='App'>
        <NotesContext.Provider value={contextValue}>
          <Switch>
            <Route 
              exact path="/" 
              /* component={<MainPage  
                  onClickTitle = {() => history.push("/")}/>} */
              component={MainPage}
            />
            <Route 
              path="/folders/:folderId" 
              /* component = { <FolderPage 
                onClickTitle = {() => history.push("/")}/>} */
              component={FolderPage}
            />
            <Route 
              path="/notes/:noteId" 
              /* component= {<NotePage 
                    onClickBack = {() => history.goBack()} 
                    onClickTitle = {() => history.push("/")}/>} */
              component={NotePage}
            />
          </Switch>
        </NotesContext.Provider>
      </main>
    );
  }
}

export default App;