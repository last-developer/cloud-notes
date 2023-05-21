import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note } = props;

  return (
    <>
      <div className="note">
        <h3>{note.title}</h3>
        <p>{note.description}</p>
        <div className='icons'>
          <i className="fa-solid fa-trash" onClick={() => { deleteNote(note._id) }}></i>
          <i className="fa-solid fa-pen"></i>
        </div>
      </div>
      <br />
    </>
  )
}

export default Noteitem
