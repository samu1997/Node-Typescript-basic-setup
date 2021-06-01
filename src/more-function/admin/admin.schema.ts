import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { isEmail } = require('validator');

export const adminSchema = new Schema({
    name: { type: String },
    gender: { type: String },
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'invalid email'],
        createIndexes: { unique: true },
    },
    password: { type: String, required: true },
    roll: { type: String, enum: ['admin', 'staff', 'teacher', 'principal', 'hod'], default: 'staff' },
    created_date: { type: Date, default: Date.now }
})