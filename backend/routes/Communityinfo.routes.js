import express from 'express';
import {
  getCommunityInfo,
  getCommunityInfoById,
  createCommunityInfo,
  deleteCommunityInfo
} from '../controllers/CommunityInfo.controller.js';

const CommunityInfoRoute = express.Router();

CommunityInfoRoute.get('/', getCommunityInfo);
CommunityInfoRoute.get('/:id', getCommunityInfoById);
CommunityInfoRoute.post('/', createCommunityInfo);
CommunityInfoRoute.delete('/:id', deleteCommunityInfo);

export default CommunityInfoRoute;