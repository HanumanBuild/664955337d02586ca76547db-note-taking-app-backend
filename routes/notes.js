const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  const note = new Note({
    content: req.body.content,
    userId: req.user._id
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note == null || note.userId.toString() !== req.user._id) {
      return res.status(404).json({ message: 'Cannot find note' });
    }

    if (req.body.content != null) {
      note.content = req.body.content;
    }

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note == null || note.userId.toString() !== req.user._id) {
      return res.status(404).json({ message: 'Cannot find note' });
    }

    await note.remove();
    res.json({ message: 'Deleted Note' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;