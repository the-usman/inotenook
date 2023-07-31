import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = 'http://localhost:5000/api'
    const note1 = []
    const [notes, setNotes] = useState(note1)

    const getNotes = async () => {
        const response = await fetch(`${host}/notes/getnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token-auth": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setNotes(json)
    }
    const addNote = async (title, description, tag) => {
        const data = {
            title : title,
            description : description,
            tag:tag
        }
        const response = await fetch(`${host}/notes/addnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token-auth": localStorage.getItem('token')
            },
            body : JSON.stringify(data)

        });
        const note = await response.json()
        setNotes(notes.concat(note))
    }
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/notes/deletenotes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token-auth": localStorage.getItem('token')
            }

        });
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
        
    }

    // Edit Notes
    const editNote = async (id, title, description, tag) =>{
        const data = {
            title : title,
            description : description,
            tag:tag
        }
        const response = await fetch(`${host}/notes/updatenotes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token-auth": localStorage.getItem('token')
            },
            body : JSON.stringify(data)
        });
        const updatedNote = {
            title: title,
            description: description,
            tag: tag
        };

        const newNotes = notes.map((note) =>
            note._id === id ? updatedNote : note
        );
        setNotes(newNotes);
    }
    
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;