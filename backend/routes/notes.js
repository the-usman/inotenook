const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchuser')
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator');

router.get('/getnotes', fetchUser, async (req, res) => {
    const note = await Note.find({ user: req.user.id })
    res.json(note)
})


router.post('/addnotes', fetchUser, [
    body('title', "Enter the valid title").isLength({ min: 3 }),
    body('description', "Enter the valid description").isLength({ min: 5 })
], async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { title, description, tag } = req.body
        const note = new Note(
            {title, description, tag, user: req.user.id}
        )
        const savedNotes = await note.save()
        res.send(savedNotes)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }

})

router.put('/updatenotes/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const newNote = {}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}
        const note = await Note.findById(req.params.id)
        if(!note){
            return res.status(404).json({error: "Not Found"})
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).json({error:"Not Allowed"})
        }
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true})
        res.send(updatedNote)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }

})





router.put('/deletenotes/:id', fetchUser, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if(!note){
            return res.status(404).json({error: "Not Found"})
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).json({error:"Not Allowed"})
        }
        const updatedNote = await Note.findByIdAndDelete(req.params.id)
        res.send({Success : "This is not is deleted from the data base"})
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }

})






module.exports = router