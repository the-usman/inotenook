import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext/noteContext'
import alertContext from '../context/Alertcontext/alertContext';


const AddNote = () => {
    const { addNote } = useContext(noteContext)
    const {showAlert}= useContext(alertContext)
    const [selectedTag, setSelectedTag] = useState('Default');
    const [note, setNote] = useState({ title: "", description: "" })
    const handleClickBadge = (e) => {
        const b = e.target.innerText
        setSelectedTag(b)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setNote({tag:selectedTag})
        if (note.title !== "" && note.description !== "")
            addNote(note.title, note.description, selectedTag);
        setNote({
            title: "", description: ""
        })
        setSelectedTag(
            "Default"
        )
        showAlert("Successfully Added note", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (

        <div>
            <div className="container my-3 text-left">
                <h2>Add Notes</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="tltle" name="title"  value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="form-floating my-3">
                        <textarea className="form-control" placeholder="Leave a comment here" value={note.description} id="floatingTextarea" name="description" onChange={onChange}></textarea>
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
                    <br />
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add a Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
