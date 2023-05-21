import React, { useState } from "react";
import noteContext from "./noteContext";
const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "6465ad3a56c9dc5957ea5f0a",
      "user": "64622426d00ca8392d8a9c89",
      "title": "im 3rd title",
      "description": "im 3rd desc",
      "tag": "im tag bro",
      "date": "2023-05-18T04:44:42.507Z",
      "__v": 0
    },
    {
      "_id": "6468dd0930b1b2af7459b6c7",
      "user": "64622426d00ca8392d8a9c89",
      "title": "im null title",
      "description": "im desc",
      "tag": "im tag bro",
      "date": "2023-05-20T14:45:29.516Z",
      "__v": 0
    },
    {
      "_id": "6468dd3830b1b2af7459b6ce",
      "user": "64622426d00ca8392d8a9c89",
      "title": "im 1st title",
      "description": "im desc",
      "tag": "im tag bro",
      "date": "2023-05-20T14:46:16.433Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)

  // Add a note
  const addNote = (title, description, tag) => {
    const note = {
      "_id": "6468dd3830b1b2af7459b6ce",
      "user": "64622426d00ca8392d8a9c89",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-05-20T14:46:16.433Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  // Delete a note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  
  // Edit a note
  const editNote = (id, title, description, tag) => {

  }
  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </noteContext.Provider>
  )

}

export default NoteState;