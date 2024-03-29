import React from 'react'
import './NotePage.css';
import config from '../config';
import {Link} from 'react-router-dom';
import { NotesConsumer } from '../NotesContext/NotesContext';
import { NotesContext } from '../NotesContext/NotesContext';
import {withRouter} from 'react-router-dom';

class NotePage extends React.Component {

    static contextType = NotesContext;

    deleteNote = (noteId) => {
        window.history.back();
        this.deleteNoteRequest(noteId);
    }
    
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
            alert(error)
        })

    }

    goBack = () => {
        this.props.history.goBack();
    }
    
    render() {

        const note = this.context.notes.find(n =>
            n.id === this.props.match.params.noteId)
        console.log(note);
        let formattedDate = note.modified.substring(0,10);
        const folder = this.context.folders.find(f =>
            f.id === note.folderId);
        console.log(folder)
    
    

        return (
            <NotesConsumer>
            {(value) => (
                <div>
                        <header className="appTitle">
                            <h1 className="title">
                                <Link to="/">
                                    Noteful
                                </Link>
                            </h1>
                        </header>
                        <main>
                            <section className="mainPage">
                                <div className="noteDisplay">
                                    <div className = "noteHolder">
                                        <h2 className="noteName">{note.name}</h2>
                                        <p className="modified">Modified on {formattedDate}</p>
                                        <button 
                                            className="deleteNote"
                                            onClick={() => {
                                                this.deleteNote(note.id)}}
                                        >
                                            Delete note
                                        </button>
                                    </div>
                                    <div className = "contentHolder">
                                        <p className = "noteContent">{note.content}</p>
                                    </div>
                                </div>
                                <div class="goBackDisplay">
                                    <button className = "goBack" onClick={this.goBack}>Go Back</button>
                                    <h2 className = "folderName"> Folder : {folder.name}</h2>
                                </div>
                            </section>
                        </main>
                    </div>
                )}
            </NotesConsumer>
        )
    }
}

export default withRouter(NotePage);
