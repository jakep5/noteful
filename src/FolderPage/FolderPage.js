import React, { Component } from 'react'
import './FolderPage.css';
import '../MainPage/MainPage';
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NotesConsumer } from '../NotesContext/NotesContext';
import NotesContext from '../NotesContext/NotesContext'
import '../NotePage/NotePage.css';

class FolderPage extends React.Component {

    static contextType = NotesContext

    render() {
        const { folders = []} = this.context.folders
        const {notes} = this.context.notes

        const noteArray = notes.filter( note =>
            note.folderId === this.props.match.params.folderId)
        
        console.log(noteArray)
        let dateArray = [];

        noteArray.map( note =>
            dateArray.push((note.modified).substring(0,10)))

        console.log(dateArray)

        
        return (
            <NotesConsumer>
                {(context) => (
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
                                            <button className="deleteButton">Delete Note</button>
                                        </div>
                                    )}

                                </div>
                                <div className = "goBackDisplay">
                                    {context.folders.map(folder => {
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
