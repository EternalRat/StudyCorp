import { Schema, model } from 'mongoose';
const Vwarns = new Schema({
    userId: {type: String, required:true},
    pseudo: {type: String, required:true},
    reason: {type: String, required: true}
});

export default model('vwarns', Vwarns);