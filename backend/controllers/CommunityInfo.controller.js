import CommunityInfo from "../models/CommunityInfo.model.js";
import { handleSuccess } from '../helpers/handleSuccess.js';
import { handleError } from '../helpers/handleError.js';

export const createCommunityInfo = async (req, res) => {
    const { title, description, category, videoLink, createdBy } = req.body;
    // Use createdBy from body if not using authentication
    try {
        const newCommunityInfo = await CommunityInfo.create({
            title,
            description,
            category,
            createdBy,
            videoLink
        });
        handleSuccess(res, 201, 'Community information created successfully', newCommunityInfo);
    } catch (error) {
        return handleError(res, 500, 'Failed to create community information', error);
    }
}

export const getCommunityInfo = async (req, res) => {
  try {
    const communityInfo = await CommunityInfo.find().populate('createdBy', 'name email');
    handleSuccess(res, 200, 'Community information retrieved successfully', communityInfo);
  } catch (error) {
    return handleError(res, 500, 'Failed to retrieve community information', error);
  }
}

export const getCommunityInfoById = async (req, res) => {
    const { id } = req.params;

    try {
        const communityInfo = await CommunityInfo.findById(id).populate('createdBy', 'name email');
        if (!communityInfo) {
            return handleError(res, 404, 'Community information not found');
        }
        handleSuccess(res, 200, 'Community information retrieved successfully', communityInfo);
    } catch (error) {
        return handleError(res, 500, 'Failed to retrieve community information', error);
    }
}

export const deleteCommunityInfo = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCommunityInfo = await CommunityInfo.findByIdAndDelete(id);
        if (!deletedCommunityInfo) {
            return handleError(res, 404, 'Community information not found');
        }
        handleSuccess(res, 200, 'Community information deleted successfully');
    } catch (error) {
        return handleError(res, 500, 'Failed to delete community information', error);
    }
}