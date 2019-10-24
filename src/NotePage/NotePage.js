import React from 'react'
import './NotePage.css';
import notesList from '../store'

function NotePage(props) {
    const note = notesList.notes.find(n =>
        n.id === props.match.params.noteId)
    return (
        <div>
            <header className="appTitle">
                <h1 className="title">Noteful</h1>
            </header>
            <main>
                <section className="mainPage"></section>
                    <div class="noteDisplay">
                        <h2>{note.name}</h2>
                        <p>{note.content}</p>
                    </div>
                    <div class="goBackDisplay"></div>
            </main>
        </div>
    )
}

export default NotePage
