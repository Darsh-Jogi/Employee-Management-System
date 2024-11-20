import mongoose from 'mongoose'
import { Schema } from "mongoose";

const ApplicantSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address format',
        }
    },
    contactnumber : {
        type: String,
        required: true
    },
    appliedrole: {
        type: String,
        required: true
    }
})

export const Applicant = mongoose.model("Applicant", ApplicantSchema)