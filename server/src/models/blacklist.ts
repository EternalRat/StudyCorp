import mongoose from 'mongoose';
const blacklistDb = new mongoose.Schema({
    pseudo: {type: String,},
    userid: {type: String,},
    motif: {type: String,}
});
export default mongoose.model('blacklist', blacklistDb);