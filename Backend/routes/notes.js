const express = require('express')
const router = express.Router()
const fetchuser = require('../middlewares/fetchuser');
const Note = require('../models/Note')
const { body, validationResult, ValidationChain } = require('express-validator');

// Router 1: get all notes using :get "/api/notes/fetchallnotes/"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Router 2: add a new note using :post "/api/notes/addnote/"
router.post('/newnote', fetchuser, [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be of atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)

    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error");
    }
})

// Router 3: update note using :put "/api/notes/updatenote/"
router.put('/updatenote/:id', fetchuser,async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // create a new Note 
        const newNote = {}
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        // find note
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
        // comment 2 lines
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Found")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Router 4: delete note using :delete "/api/notes/deletenote/"
router.delete('/deletenote/:id',fetchuser, async (req, res) => {
    try {
        // find note
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Found")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"success":"Note has been deleted",note:note});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router