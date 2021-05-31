import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const crudSchema = new Schema({
    name: { type: String }
})