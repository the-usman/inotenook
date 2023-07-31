import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/noteContext/noteContext'
import NoteItems from './NoteItems'
import AddNote from './AddNote'
import alertContext from '../context/Alertcontext/alertContext';
import { useNavigate } from 'react-router-dom';

export default function Notes() {
    const navigate = useNavigate()
    const {showAlert}= useContext(alertContext)
    const { notes, getNotes } = useContext(noteContext)
    useEffect(() => {
        if(localStorage.getItem('token'))
        getNotes()
        else{
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const closeModal = useRef(null)


    const { editNote } = useContext(noteContext)
    const [selectedTag, setSelectedTag] = useState('Default');
    const [note, setNote] = useState({ etitle: "", edescription: "", eId : "" })
    const handleClickBadge = (e) => {
        const b = e.target.innerText
        setSelectedTag(b)
    }

    const handleSubmit = (e) => {
        setNote({tag:selectedTag})
        if (note.etitle !== "" && note.edescription !== "")
            editNote(note.eId, note.etitle, note.edescription, selectedTag);
        closeModal.current.click();
        showAlert("Successfully Updated note", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const updateNoteF = (note) => {
        ref.current.click();
        setNote({
            etitle : note.title,
            edescription : note.description,
            eId : note._id
        })
        setSelectedTag(note.tag)
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" ref={ref} data-bs-toggle="modal" style={{ display: 'none' }} data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="tltle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle}/>
                                </div>
                                <div className="form-floating my-3">
                                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" name="edescription" onChange={onChange} value={note.edescription}></textarea>
                                    <label htmlFor="floatingTextarea">Description</label>
                                </div>
                                {selectedTag && (
                                    <h2><span className="badge bg-secondary">{selectedTag}</span></h2>
                                )}
                                <br />
                                <span onClick={handleClickBadge} className="mx-2 my-3 badge rounded-pill bg-primary">Personal</span>
                                <span onClick={handleClickBadge} className="mx-2 my-3 badge rounded-pill bg-secondary">Youtube</span>
                                <span onClick={handleClickBadge} className="mx-2 my-3 badge rounded-pill bg-success">Project</span>
                                <span onClick={handleClickBadge} className="mx-2 my-3 badge rounded-pill bg-danger">Facebook</span>
                                <span onClick={handleClickBadge} className="mx-2 my-3 badge rounded-pill bg-warning text-dark">University</span>
                                <span onClick={handleClickBadge} className="mx-2 my-3 badge rounded-pill bg-info text-dark">Home</span>
                                <span onClick={handleClickBadge} className="mx-2 my-3 badge rounded-pill bg-light text-dark">Fun</span>

                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <AddNote />
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.length === 0 && <h5>There is no note to display</h5>}
                {notes.map((note) => {
                    return <NoteItems note={note} key={note._id} updateNoteF={updateNoteF} />
                })}
            </div>
        </div>
    )
}
