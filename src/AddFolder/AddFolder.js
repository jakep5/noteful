import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NotesContext } from '../NotesContext/NotesContext';
import { NotesConsumer } from '../NotesContext/NotesContext';
import '../MainPage/MainPage.css';
import './AddFolder.css';



export default class AddFolder extends Component {

    static contextType = NotesContext;

    handleSubmit = (e) => {
        e.preventDefault();
        const folderName = document.getElementById('folderName').value;
        console.log(folderName)
        this.context.addFolder(folderName)
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
                        <section className="AddFolder">
                            <div className = "AddFolderForm">
                                <form 
                                    id="addFolder"
                                    onSubmit = {(e) => this.handleSubmit(e)}
                                >
                                    <legend className="formLegend">Add Folder</legend>
                                    <label htmlFor="folderName">Folder name:</label>
                                    <input id="folderName" type="text" required/>
                                    <button 
                                        className="folderFormSubmit"
                                        type="submit" 
                                        htmlFor="addFolder"
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
