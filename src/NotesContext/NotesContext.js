import React from 'react'

const NotesContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    handleFetch: () => {},
});

/* class NotesProvider extends React.Component{
    state = {
        notes: [],
        folders: [],
        deleteNote: newNotes => {
            this.setState({
                notes: newNotes
            })
        },
        handleFetch: (notes,folders) => {
            this.setState({
                notes: notes,
                folders: folders,
            })
        }
    } */
/* 
    handleFetch(notes, folders) {
        this.setState({
            notes: notes,
            folders: folders
        })
    }

    deleteNote(newNotes) {
        this.setState({
            notes: newNotes
        })
    } */

    /* render() {
        return(
            <NotesContext.Provider
                context = {{
                    notes : this.state.notes,
                    folders : this.state.folders,
                    handleDeleteNote : this.state.deleteNote(),
                    handleFetch : this.state.handleFetch()
                }}>
                {this.props.children} {/* lives at top level of app, can then be accessed anywhere */
            /* </NotesContext.Provider>
        )

    }
} */ 



export default NotesContext