import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    discordId: { type: String, required: true },
    username: { type: String, required: true },
    avatar: { type: String, required: true },
    guilds: { type: Array, required: true }
});

export default mongoose.model('User', UserSchema);