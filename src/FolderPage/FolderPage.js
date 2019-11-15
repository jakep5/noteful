import React from 'react';
import './FolderPage.css';
import '../MainPage/MainPage';
import {withRouter} from 'react-router-dom';
import config from '../config';
import { Link } from 'react-router-dom';
import { NotesConsumer } from '../NotesContext/NotesContext';
import { NotesContext } from '../NotesContext/NotesContext';
import '../NotePage/NotePage.css';

class FolderPage extends React.Component {

    static contextType = NotesContext

    deleteNoteRequest = (noteId) => {

        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type':'application/json'
            }
        })
        .then(response => {
            if(!response.ok) {
                return response.json().then(error => {
                    throw error
                })
            }
            return response.json()
        })
        .then(noteId => {
            this.context.deleteNote(noteId)
        })
        .catch(error => {
            console.log(error)
        })

    }


    render() {
        const { folders = []} = this.context.folders;
        const notes = this.context.notes;

        const noteArray = notes.filter( note =>
            note.folder_id == this.props.match.params.folderId)
                
        let dateArray = [];

        noteArray.map( note =>
            dateArray.push((note.modified).substring(0,10)))


        
        return (
            <NotesConsumer>
                {value => (
                    <div>
                        <header className="appTitle">
                            <h1 className="title">
                                <Link to="/">
                                    Noteful
                                </Link>
                            </h1>
                        </header>
                        <main>
                            <section className ="mainPage">
                                <div className = "noteDisplay">
                                    {noteArray.map((note, index) => 
                                        <div className="noteHolder">
                                            <h2 className="noteName">
                                                <Link to={`/notes/${note.id}`}>
                                                    {note.name}
                                                </Link>
                                            </h2>
                                            <p className="modified">Date modified: {dateArray[index]}</p>
                                            <button 
                                                className="deleteButton"
                                                onClick={() => {
                                                    this.deleteNoteRequest(note.id,
                                                        value.deleteNote(note.id))
                                                }}>Delete Note</button>
                                        </div>
                                    )}

                                </div>
                                <div className = "goBackDisplay">
                                    {value.folders.map(folder => {
                                        if (folder.id === this.props.match.params.folderId) {
                                            return (
                                                <div className="folderHolder highlighted">
                                                    <h2 className="folderName">
                                                        <Link to={`/folders/${folder.id}`}>
                                                            {folder.name}
                                                        </Link>
                                                    </h2>
                                                </div>
                                            )}
                                        else {
                                            return (
                                                <div className="folderHolder">
                                                    <h2 className="folderName">
                                                        <Link to={`/folders/${folder.id}`}>
                                                            {folder.name}
                                                        </Link>
                                                    </h2>
                                                </div>
                                            )}
                                    })}
                                </div>
                            </section>
                        </main>
                    </div>
            )}
            </NotesConsumer>
        )
    }
}

export default withRouter(FolderPage);
