import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
  const context= useContext(noteContext)
  const {notes}=context
  return (
    <>
    <AddNote/>
      <section>
        <h2>Your Notes</h2>
        {
          notes.map((note) => {
            return <Noteitem key={note._id} note={note} />;
          })
        }
      </section>
    </>

  )
}

export default Notes
