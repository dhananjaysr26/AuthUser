import mongoose from 'mongoose';

const notesSchema = mongoose.Schema({
    user_id: String,
    notes: [{
        title: String,
        note: String

    }]
})

const NotesData = mongoose.model('Note', notesSchema)
export default NotesData;