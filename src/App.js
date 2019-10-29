import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import FolderPage from './FolderPage/FolderPage';
import config from './config'
import NotePage from './NotePage/NotePage';
import { NotesProvider } from './NotesContext/NotesContext';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: []
    };
  }


  deleteNote(noteId) {
    const afterDeleteNotes = this.state.notes.filter(nt =>
        nt.id !== noteId
    )
    this.setState({
        notes: afterDeleteNotes
    })
  }

    handleFetch = (newNotes, newFolders) => {
      this.setState({
        notes: newNotes,
        folders: newFolders
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
      .then(([notesResponse, foldersResponse]) => {
        this.handleFetch(notesResponse, foldersResponse)
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
        <NotesProvider context={contextValue}>
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
        </NotesProvider>
      </main>
    );
  }
}

export default App;