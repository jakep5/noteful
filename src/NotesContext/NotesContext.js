import React from 'react'
import config from '../config';

export const NotesContext = React.createContext();

export class NotesProvider extends React.Component {
    
    state = {
        notes: [],
        folders: []
    }

    deleteNote = (noteId) => {
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

    addFolder = (newFolder) => {
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            body: {"name": newFolder},
        })
        .then(response => {
            if(!response.ok) {
                return response.json().then(error => {
                    throw error
                })
            }
            return response.json()
        })
        /* .then(response => this.handleAddFolder(response)) */
        .then(this.updateFoldersFetch)
        .catch(error => {
            alert(error)
        })
    }   

    getAddNoteFolder = (noteObject) => {
        const matchingFolder = this.state.folders.filter(fldr =>
            fldr.name == noteObject.folder)
        this.getFolderId(matchingFolder, noteObject);
    }

    getFolderId = (matchingFolder, noteObject) => {
        const matchFolderId = matchingFolder[0].id;
        this.addNoteFetch(matchFolderId, noteObject)
    }

    addNoteFetch = (noteObject, matchFolderId) => {
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: "123456",
                name: noteObject.name,
                modified: new Date().getTime(),
                folderId: matchFolderId,
                content: noteObject.content
            })
        })
    }

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
        .then(response => console.log(response))
        /* .then(newFolders => {
            this.setState({
                folders: newFolders
            })
        }) */

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






/* class NotesProvider extends React.Component{
    state = {
        notes: [],
        folders: [],
        deleteNote: newNotes => {
            this.setState({
                notes: newNotes
            })
        },
        handleFetch: (notes,folders) => {
            this.setState({
                notes: notes,
                folders: folders,
            })
        }
    } */
/* 
    handleFetch(notes, folders) {
        this.setState({
            notes: notes,
            folders: folders
        })
    }

    deleteNote(newNotes) {
        this.setState({
            notes: newNotes
        })
    } */

    /* render() {
        return(
            <NotesContext.Provider
                context = {{
                    notes : this.state.notes,
                    folders : this.state.folders,
                    handleDeleteNote : this.state.deleteNote(),
                    handleFetch : this.state.handleFetch()
                }}>
                {this.props.children} {/* lives at top level of app, can then be accessed anywhere */
            /* </NotesContext.Provider>
        )

    }
} */ 