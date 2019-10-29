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


  deleteNote(noteId) {
    const afterDeleteNotes = this.state.notes.filter(nt =>
        nt.id !== noteId
    )
    this.setState({
        notes: afterDeleteNotes
    })
  }

  handleFetch = (notes, folders) => {
      this.setState({
          notes: notes,
          folders: folders
      })
  }
  
  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
        /* .then(values => Promise.all(values.map(value => value.json())))
        .then(finalValues => {
          let notes = finalValues[0];
          let folders = finalValues[1];
          this.handleFetch(notes, folders)
        }) */
      .then(([notesResponse, foldersResponse]) => {
        if (!notesResponse.ok)
          return notesResponse.json().then(e=>Promise.reject(e));
        if (!foldersResponse.ok)
          return foldersResponse.json().then(e=>Promise.reject(e))

        return (Promise.all([notesResponse.json(), foldersResponse.json()]));
      })
      .then(([notes, folders]) => {
        this.handleFetch(notes, folders)
      })
      .catch(error => {
        console.error({error});
      })
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote : this.deleteNote,
      handleFetch: this.handleFetch
    }
    return (
      <main className='App'>
        <NotesContext.Provider context={contextValue}>
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
          </Switch>
        </NotesContext.Provider>
      </main>
    );
  }
}

export default App;