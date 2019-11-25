import React from 'react'
import config from '../config';
import moment from 'moment';

export const NotesContext = React.createContext();

export class NotesProvider extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            folders: []
        }
    }

    deleteNote = (noteId) => {
      const afterDeleteNotes = this.state.notes.filter(nt =>
          nt.id !== noteId
      )
      this.setState({
          notes: afterDeleteNotes
      });
    }

    handleFetch = (newNotes, newFolders) => {
        this.setState({
            notes: newNotes,
            folders: newFolders
        })
    }

    addFolder = (folderName) => {
        const folderId = this.state.folders[this.state.folders.length - 1].id;
        const newFolderId = folderId + 1;
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: newFolderId,
                name: folderName
            })
        })
        .then(response => {
            if(!response.ok) {
                return response.json().then(error => {
                    throw error
                })
            }
            return response.json()
        })
        .then(newFolder => (this.updateFolder(newFolder)))
        .catch(error => {
            console.log(error)
        })
    } 
    
    updateFolder = (newFolder) => {
        this.setState({
            folders: [...this.state.folders, newFolder]
        });
    }


    getAddNoteFolder = (noteObject) => {
        const matchingFolder = this.state.folders.filter(fldr =>
            fldr.name === noteObject.folder)
        console.log(matchingFolder)
        this.getFolderId(matchingFolder, noteObject);
    }

    getFolderId = (matchingFolder, noteObject) => {
        const matchFolderId = matchingFolder[0].id;
        this.addNoteFetch(noteObject, matchFolderId)
    }

    addNoteFetch = (noteObject, matchFolderId) => {
        const noteId = (this.state.notes.length) ? this.state.notes[this.state.notes.length - 1].id : 1;
        const newNoteId = noteId + 1;
        var date = moment().toISOString();
        const newNote = {
            id: newNoteId,
            name: noteObject.name,
            modified: date,
            folder_id: matchFolderId,
            content: noteObject.content
        }
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote)
        })
        .then(newNote => this.updateNotes(newNote))
        .catch(error => {
            console.log(error)
        })
    }

    updateNotes = (newNote) => {
        this.setState({
            notes: [...this.state.notes, newNote]
        });
/*         window.location.reload();
 */    }

    updateFoldersFetch = () => {
        fetch(`${config.API_ENDPOINT}/folders`)
        .then((response) => {
            if(!response.ok) {
                return response.json().then(error => {
                    throw error
                })
            }
            return response.json()
        })
        .then(newFolders => {
            this.setState({
                folders: newFolders
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    updateNotesFetch = () => {
        fetch(`${config.API_ENDPOINT}/notes`)
        .then((response) => {
            if(!response.ok) {
                return response.json().then(error => {
                    throw error
            })
        }
        return response.json()
        })
        .then (newNotes => {
            this.setState({
                notes: newNotes
            })
        })
        .then(console.log(this.state.notes))
        .catch(error => {
            console.log(error)
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
                console.log(error)
            })
    }

    render() {

        const contextValue = {
          notes: this.state.notes,
          folders: this.state.folders,
          deleteNote : this.deleteNote,
          handleFetch: this.handleFetch,
          addFolder: this.addFolder,
          getAddNoteFolder: this.getAddNoteFolder
        }

        return (
            <NotesContext.Provider
                value = {contextValue}
            >
                {this.props.children}
            </NotesContext.Provider>
        )
    }


}


export const NotesConsumer = NotesContext.Consumer;