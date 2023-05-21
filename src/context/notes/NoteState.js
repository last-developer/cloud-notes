import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  // get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MjI0MjZkMDBjYTgzOTJkOGE5Yzg5In0sImlhdCI6MTY4NDE2MTAwNH0.TurYkyGr3VjS5KsyqZcSmzOQrtcO3nHrn5sR0s8Xsks"
      }
    })
    const json = await response.json();
    setNotes(json)
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/newnote`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MjI0MjZkMDBjYTgzOTJkOGE5Yzg5In0sImlhdCI6MTY4NDE2MTAwNH0.TurYkyGr3VjS5KsyqZcSmzOQrtcO3nHrn5sR0s8Xsks"
      }, body: JSON.stringify({ title, description, tag })
    })
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MjI0MjZkMDBjYTgzOTJkOGE5Yzg5In0sImlhdCI6MTY4NDE2MTAwNH0.TurYkyGr3VjS5KsyqZcSmzOQrtcO3nHrn5sR0s8Xsks"
      }
    })
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,
      {
        method: 'PUT', headers:
        {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MjI0MjZkMDBjYTgzOTJkOGE5Yzg5In0sImlhdCI6MTY4NDE2MTAwNH0.TurYkyGr3VjS5KsyqZcSmzOQrtcO3nHrn5sR0s8Xsks"
        },
        body: JSON.stringify({ title, description, tag })
      })
    const json = await response.json();
    // console.log(json);
    let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
    
  }
  return (
    <noteContext.Provider value={{ notes, setNotes,addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )

}

export default NoteState;