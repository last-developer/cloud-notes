import React, { useState } from "react";
import noteContext from "./noteContext";
const NoteState=(props)=>{
   const notesInitial=[
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
    const [notes,setNotes]=useState(notesInitial)
    return (
        <noteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;