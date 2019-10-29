import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NotesContext } from '../NotesContext/NotesContext';
import { NotesConsumer } from '../NotesContext/NotesContext';
import '../MainPage/MainPage.css';
import './AddFolder.css';



export default class AddFolder extends Component {

    static contextType = NotesContext;

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
                        <section class="AddFolder">
                            <div className = "AddFolderForm">
                                <form id="addFolder">
                                    <legend>Add Folder</legend>
                                    <label for="folderName">Folder name:</label>
                                    <input id="folderName" type="text" />
                                </form>
                            </div>
                        </section>
                    </div>
                    )}
        </NotesConsumer>
        )
    }
}
