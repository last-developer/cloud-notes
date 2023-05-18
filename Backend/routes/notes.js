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

module.exports = router