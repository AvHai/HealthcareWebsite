import express from 'express';
import { getMedicalCamps, createMedicalCamp,deleteMedicalCamp, getMedicalCampByUserId } from '../controllers/MedicalCamp.controller.js';
import isAuth from '../middlewares/auth.middleware.js';

const medicalCampRouter = express.Router();

medicalCampRouter.get('/', getMedicalCamps);
medicalCampRouter.post('/', createMedicalCamp); 
medicalCampRouter.delete('/:id', deleteMedicalCamp);

export default medicalCampRouter;