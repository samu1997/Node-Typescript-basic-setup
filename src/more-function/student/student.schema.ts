import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const studentSchema = new Schema({
    name: { type: String },
    age: { type: Number },
    roll_no: { type: Number },
    corrseponding_address: { type: String },
    current_address: { type: String },
    contact: [{ name: String, number: Number, relation: String }],
    gender: { type: String },
    emailId: { type: String },
    classTeacher: { id: String, name: String },
    subjects: [{ name: String, id: String }],
    current_class: { type: String },
    marks: [{ class: String, percent: Number }],
    created_date: { type: Date, default: Date.now }
})