import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const sampleSchema = new Schema({
    name: { type: String }
})