import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
// import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const context = useContext(noteContext)
  const { notes, getNotes, editNote } = context
// const navigate=useNavigate()
  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     getNotes()
  //   }
  //   else{
  //     navigate('/login')
  //   }
  //   //eslint-disable-next-line
  // }, [])
  useEffect(() => {
         getNotes()
    //eslint-disable-next-line
  }, [])

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  // const ref=useRef(null)

  const updateNote = (currentNote) => {
    const modal = document.getElementById('modal')
    modal.style.display = "block"
    setNote({ is: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }

  const handleClick = (e) => {
    const modal = document.getElementById('modal')
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag)
    console.log("updating..." + note.etitle);
    modal.style.display = "none"
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote />
      <section className="modal" id='modal'>
        <div className="addnote">
          <form >
            <div>
              <label htmlFor="etitle">Title</label>
              <input type="text" id='etitle' name='etitle' value={note.etitle} onChange={onChange} minLength={5} required />
            </div>
            <div>
              <label htmlFor="edescription">Description</label>
              <input type="text" id='edescription' name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
            </div>
            <div>
              <label htmlFor="etag">Tag</label>
              <input type="text" id='etag' name='etag' value={note.etag} onChange={onChange} />
            </div>
            <div>
            </div>
          </form>
              <button type='submit' disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick}>Save changes</button>
        </div>
      </section>

      <section>
        <h2>Your Notes</h2>
        {notes.length===0 && 'No notes to display'}
        {
          notes.map((note) => {
            return <Noteitem key={note._id} note={note} updateNote={updateNote} />;
          })
        }
      </section>
    </>

  )
}

export default Notes
