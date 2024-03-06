import mongoose from 'mongoose';
const TicketsMessage = new mongoose.Schema({
    userId: {type: String},
    userPseudo: {type: String},
    idticket: {type: Number},
    timestamp: {type: Number},
    content: {type: String},
    avatar: {type: String}
});

export default mongoose.model('ticketmessage', TicketsMessage);