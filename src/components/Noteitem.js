import React from 'react'

const Noteitem = (props) => {
    const {note}=props;
  return (
    <>
    <div className="note">
        <h3>{note.title}</h3>
        <p>{note.description}</p>
        <div className='icons'>
        <i class="fa-solid fa-trash"></i>
        <i class="fa-solid fa-pen"></i>        </div>
    </div>
    <br />
    </>
  )
}

export default Noteitem
