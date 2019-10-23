import React, { Component } from 'react'
import './MainPage.css';
import notesList from '../store';


export default class MainPage extends Component {
    render() {
        return (
            <div>
                <header className="appTitle">
                    <h1 className="title">Noteful</h1>
                </header>
                <main>
                    <section className="mainPage">
                        <div className="notesHolder">
                            {notesList.notes.map(note => 
                                <div className="noteHolder">
                                    <h2 className="noteName">{note.name}</h2>
                                    <p className="modified">Date modified: {note.modified}</p>
                                    <button className="deleteButton">Delete Note</button>
                                </div>
                            )}
                        </div>
                        <div className="foldersHolder">
                            {notesList.folders.map(folder =>
                                <div className="folderHolder">
                                    <h2 className="folderName">{folder.name}</h2>
                                </div>)}
                            <button className="addFolder">Add folder</button>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}
