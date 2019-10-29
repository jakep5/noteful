import React from 'react'
import {Link} from 'react-router-dom';
import NotesContext from '../NotesContext/NotesContext';
import { NotesConsumer } from '../NotesContext/NotesContext'
import config from '../config';
import './MainPage.css';


class MainPage extends React.Component {

    static defaultProps = {
        onDeleteNote: () => {},
        history: {
            goBack: () => {},
        }
    }


    static contextType = NotesContext;

    deleteNoteRequest(noteId, callback) {

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
            callback(noteId)
        })
        .catch(error => {
            alert(error)
        })

    }

    
    render() {
        return (
            <NotesConsumer>
                {(context) => (
                    <div>
                        <header className="appTitle">
                            <h1 className="title">
                                <Link to="/">Noteful</Link>
                            </h1>
                        </header>
                        <main>
                            <section className="mainPage">
                                <div className="notesHolder">
                                    <button className = "addNote">Add Note</button>
                                    {context.notes.map(note => 
                                        <div className="noteHolder">
                                            <h2 className="noteName">
                                                <Link to={`/notes/${note.id}`}>
                                                    {note.name}
                                                </Link>
                                            </h2>
                                            <p className="modified">Date modified: {note.modified}</p>
                                            <button 
                                                className="deleteButton"
                                                onClick={() => {
                                                    this.deleteNoteRequest(
                                                        note.id,
                                                        context.deleteNote
                                                    )
                                                }}>
                                                Delete Note
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="foldersHolder">
                                    {context.folders.map(folder =>
                                        <div className="folderHolder">
                                            <h2 className="folderName">
                                                <Link to={`/folders/${folder.id}`}>
                                                    {folder.name}
                                                </Link>
                                            </h2>
                                        </div>)}
                                    <button className="addFolder">Add folder</button>
                                </div>
                            </section>
                        </main>
                    </div>
                )}
            </NotesConsumer>
        )
    }
}


export default MainPage
