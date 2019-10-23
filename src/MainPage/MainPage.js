import React, { Component } from 'react'
import './MainPage.css';
import notesList from '../store';

const notesArray = Array.from(notesList)

export default class MainPage extends Component {
    render() {
        console.log(notesArray)
        return (
            <div>
                <header className="appTitle">
                    <h1 className="title">Noteful</h1>
                </header>
                <main>
                    <section className="mainPage">
                        <div className="notesHolder">
                            {notesArray.map(note => 
                                <div className="noteHolder">
                                    <h2>{note.notes.name}</h2>
                                    <p>Date modified: {note.notes.modified}</p>
                                    <button>Delete Note</button>
                                </div>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}
