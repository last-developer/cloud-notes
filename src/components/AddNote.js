import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <section>
            <h2>Add a Note</h2>
            <div className="addnote">
                <form >
                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" id='title' name='title' onChange={onChange} />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input type="text" id='description' name='description' onChange={onChange} />
                    </div>
                    <div>
                        <button type='submit' onClick={handleClick}>Submit</button>
                    </div>
                </form>
            </div>

        </section>
    )
}

export default AddNote
