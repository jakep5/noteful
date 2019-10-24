import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './MainPage.css';
import notesList from '../store';


export default class MainPage extends Component {
    render() {
        const { onClickTitle} = this.props
        return (
            <div>
                <header className="appTitle">
                    <h1 className="title" onClick = {onClickTitle}>Noteful</h1>
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
                                    <button className="deleteButton">Delete Note</button>
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
        )
    }
}
