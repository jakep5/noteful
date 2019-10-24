import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import NotesContext from '../NotesContext/NotesContext';
import config from '../config';
import './MainPage.css';
import notesList from '../store';


class MainPage extends React.Component {

    static defaultProps = {
        onDeleteNote: () => {},
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
        const { onClickTitle} = this.props
        return (
            <NotesContext.Consumer>
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
                                    {notesList.notes.map(note => 
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
                                    {notesList.folders.map(folder =>
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
            </NotesContext.Consumer>
        )
    }
}

export default MainPage
