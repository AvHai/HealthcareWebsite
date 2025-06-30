import mongoose from 'mongoose';

const communityInfoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    videoLink: {
        type: String,
        required: true,
    },
},{timestamps: true});

const CommunityInfo = mongoose.model('CommunityInfo', communityInfoSchema);
export default CommunityInfo;