import React from 'react'
import {Link} from 'react-router-dom';
import { NotesConsumer } from '../NotesContext/NotesContext';
import { NotesContext } from '../NotesContext/NotesContext'
import config from '../config';
import './MainPage.css';


class MainPage extends React.Component {

    static contextType = NotesContext;


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

    render() {
        return (
            <NotesConsumer>
                {value => (
                    <div>
                        <header className="appTitle">
                            <h1 className="title">
                                <Link to="/">Noteful</Link>
                            </h1>
                        </header>
                        <main>
                            <section className="mainPage">
                                <div className="notesHolder">
                                    <Link to="/addNote">
                                        <button className = "addNote">Add Note</button>
                                    </Link>
                                    {value.notes.map(note => 
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
                                                        value.deleteNote(note.id)
                                                    )
                                                }}>
                                                Delete Note
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="foldersHolder">
                                    {value.folders.map(folder =>
                                        <div className="folderHolder">
                                            <h2 className="folderName">
                                                <Link to={`/folders/${folder.id}`}>
                                                    {folder.name}
                                                </Link>
                                            </h2>
                                        </div>)}
                                    <Link to={'/addFolder'}>
                                        <button className="addFolder">Add folder</button>
                                    </Link>
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
