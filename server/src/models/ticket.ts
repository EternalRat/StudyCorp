import mongoose from 'mongoose';
const Tickets = new mongoose.Schema({
    userId: {type: String, required:true},
    timestamp: {type: Number, required:true},
    pseudo: {type: String, required:true},
    avatar: {type: String, required: true},
    pris: {type: String, required:true},
    idticket: {type: Number, required:true}
});

export default mongoose.model('ticket', Tickets);