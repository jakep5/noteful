import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NotesContext } from '../NotesContext/NotesContext';
import { NotesConsumer} from '../NotesContext/NotesContext';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import '../AddFolder/AddFolder.css';
import './AddNote.css';

export default class AddNote extends Component {

    static contextType = NotesContext;

    handleSubmit = (e) => {
        e.preventDefault();
        const noteObject = {
            name: document.getElementById('noteName').value,
            content: document.getElementById('noteContent').value,
            folder: document.getElementById('noteFolder').value,
        }
        this.context.getAddNoteFolder(noteObject);
        window.history.back();
    }

    render() {
        return (
                <NotesConsumer>
                    {value => (
                        <div>
                            <header className="appTitle">
                                <h1 className="title">
                                    <Link to="/">
                                        Noteful
                                    </Link>
                                </h1>
                            </header>
                            <section className="addNote">
                                <div className="addNoteFormHolder">
                                    <form 
                                        id="addNoteForm"
                                        onSubmit={(e) => this.handleSubmit(e)}>
                                        <legend className="formLegend">Add Note</legend>
                                        <label htmlFor="noteName">Note name:</label>
                                        <input id="noteName" type="text" required></input>
                                        <label htmlFor="noteContent" id="content">Note content:</label>
                                        <input id="noteContent" type="text" required></input>
                                        <label htmlFor="noteFolder" id="selectLabel">Select folder:</label>
                                        <select id="noteFolder"required>
                                            {value.folders.map(folder => 
                                                <option value={folder.name}>{folder.name}</option>
                                            )}
                                        </select>
                                        <button 
                                            className="noteFormSubmit"
                                            type="submit"
                                            htmlFor="addNoteForm"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </section>
                        </div>
                    )}
                </NotesConsumer>
        )
    }
}
