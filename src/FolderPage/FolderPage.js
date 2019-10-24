import React, { Component } from 'react'
import './FolderPage.css';
import '../MainPage/MainPage';
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
import notesList from '../store'
import '../NotePage/NotePage.css';

function FolderPage(props) {

    const folder = notesList.folders.find(f =>
        f.id === props.match.params.folderId)

    const noteArray = notesList.notes.filter( note =>
        note.folderId === props.match.params.folderId)
    
    let dateArray = [];

    noteArray.map( note =>
        dateArray.push((note.modified).substring(0,10)))

    console.log(dateArray)

    
    return (
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
                        {notesList.folders.map(folder => {
                            if (folder.id === props.match.params.folderId) {
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
    )
}

export default withRouter(FolderPage);
