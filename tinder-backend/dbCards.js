import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
    name: { type: String },
    imgUrl: { type: String } 
});

const card = new mongoose.model('cards', cardSchema);

export default card;
