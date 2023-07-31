import React, {useContext} from 'react'
import noteContext from '../context/noteContext/noteContext'
import alertContext from '../context/Alertcontext/alertContext';
export default function NoteItems(props) {
    const {showAlert}= useContext(alertContext)
    const { deleteNote } = useContext(noteContext)
    const { title, description, tag } = props.note
    const {updateNoteF} = props
    return (
        <div className="col-md-4 my-3">
            <div className="card">
                <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"90%"}}>
                    {tag}
                </span>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={()=> {deleteNote(props.note._id); showAlert("Successfully Deleted note", "success") }}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {updateNoteF(props.note);  }}></i>
                </div>
            </div>
        </div>
    )
}
