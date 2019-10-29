import React from 'react'
import './NotePage.css';
import {Link} from 'react-router-dom';
import notesList from '../store'
import NotesContext from '../NotesContext/NotesContext';
import { NotesConsumer } from '../NotesContext/NotesContext';
import {withRouter} from 'react-router-dom';

class NotePage extends React.Component {

    static contextType = NotesContext;
    
    render() {

        const note = this.context.notes.find(n =>
            n.id === this.props.match.params.noteId)
        let date = note.modified
        let formattedDate = date.substring(0,10);
        const folder = this.context.folders.find(f =>
            f.id === note.folderId)
    
    

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
                            <section className="mainPage">
                                <div className="noteDisplay">
                                    <div className = "noteHolder">
                                        <h2 className="noteName">{note.name}</h2>
                                        <p className="modified">Modified on {formattedDate}</p>
                                        <button className="deleteNote">Delete note</button>
                                    </div>
                                    <div className = "contentHolder">
                                        <p className = "noteContent">{note.content}</p>
                                    </div>
                                </div>
                                <div class="goBackDisplay">
                                    <button className = "goBack" onClick={this.props.onClickBack}>Go Back</button>
                                    <h2 className = "folderName">Folder : {folder.name}</h2>
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
