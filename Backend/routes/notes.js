const express = require('express')
const router = express.Router()
const fetchuser = require('../middlewares/fetchuser');
const Note = require('../models/Note')
const { body, validationResult, ValidationChain } = require('express-validator');

// Router 1: get all notes using :get "/api/notes/fetchallnotes/"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes)
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
    }
})

// Router 3: update note using :put "/api/notes/updatenote/"
router.put('/updatenote/:id', async (req, res) => {
    try {
        const { title, description, tag } = req.body;
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
        // if (note.user.toString() !== req.user.id) {
        //     return res.status(401).send("Not Found")
        // }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.error(error)
    }
})
module.exports = router