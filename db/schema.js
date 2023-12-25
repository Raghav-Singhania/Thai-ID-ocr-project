import mongoose, {
    Schema
} from "mongoose";

const infoSchema = new mongoose.Schema({
    image:{
        type : String,
    },
    identificationNumber:{
        type: String,
        // required: true,
    },
    firstName: {
        type: String,
        // required: true,
    },
    lastName: {
        type: String,
        // required: true,
    },
    identificationNumber: {
        type: String,
        // required: true,
    },
    dateOfBirth: {
        type: String,
        // required: true,
    },
    dateOfExpiry: {
        // type: [String],
    },
    dateOfIssue: {
        type: String,
        // required: true,
    },

});

export default mongoose.model("Info", infoSchema);