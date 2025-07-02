import mongoose from "mongoose";

const medicalCampSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true,
  },
  organizer: {
    type: String,
    required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,   
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,   
        required: true, 
    },
    address: {
        type: String,   
        required: true,
    },
    services:{
        type: [String],   
        required: true,
    },
    campType:{  
        type: String,   
        required: true,
        enum: ['Free Checkup', 'Vaccination', 'Health Awareness', 'Blood Donation', 'Specialist'],
    },
    applyLink: {
    type: String,
    required: [true, "Please enter a valid URL."],
    validate: {
      validator: function (v) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: "Please enter a valid URL.",
    },
},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},
{ timestamps: true }
);

const MedicalCamp = mongoose.model("MedicalCamp", medicalCampSchema);
export default MedicalCamp;
