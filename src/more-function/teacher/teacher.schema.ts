import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const teacherSchema = new Schema({
    name: { type: String },
    age: { type: Number },
    contact: [{ name: String, number: Number, relation: String }],
    gender: { type: String },
    emailId: { type: String },
    classes: [{ id: String, name: String }],
    subjects: [{ name: String, id: String, class: String }],
    classTeacher: { status: Boolean, class: String },
    created_date: { type: Date, default: Date.now }
});