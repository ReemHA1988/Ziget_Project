const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
    text: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  image: {
    type: String,
    minlength: 6,
    maxlength: 1024,
  },
  createdAt: { type: Date, default: Date.now },
    });

const Note = mongoose.model('Note', projectSchema);
exports.Note = Note;