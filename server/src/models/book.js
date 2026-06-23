import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    genre: { 
        type: String, 
        required: true 
    },
    readingStatus: { 
        type: String, 
        enum: ['Want to Read', 'Currently Reading', 'Finished Reading', 'Abandoned'], 
        default: 'Want to Read' 
    },
    description: { 
        type: String, 
        default: '' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Update the updatedAt field on save
bookSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Book = mongoose.model('Book', bookSchema);
export default Book;