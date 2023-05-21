import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
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
                        <input type="text" id='title' name='title' value={note.title} onChange={onChange}  minLength={5} required />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input type="text" id='description' name='description' value={note.description} onChange={onChange}  minLength={5} required/>
                    </div>
                    <div>
                        <label htmlFor="tag">Tag</label>
                        <input type="text" id='tag' name='tag' value={note.tag} onChange={onChange} />
                    </div>
                    <div>
                        <button disabled={note.title.length<5 || note.description.length<5} type='submit' onClick={handleClick}>Submit</button>
                    </div>
                </form>
            </div>

        </section>
    )
}

export default AddNote
