import MedicalCamp from "../models/MedicalCamp.js";
import { handleError } from "../helpers/handleError.js";
import { handleSuccess } from "../helpers/handleSuccess.js";


export const createMedicalCamp = async (req, res) => {  
    try {
        const { title, organizer, date, time, location, capacity, address, services, campType,applyLink,userId } = req.body;

        if (
          !title || !organizer || !date || !time || !location ||
          capacity === undefined || capacity === null || capacity === "" ||
          !address || !campType || !applyLink || !userId ||
          !Array.isArray(services) || services.length === 0
        ) {
          return handleError(res, 400, "All fields are required");
        }

        const newCamp = new MedicalCamp({
            title,
            organizer,
            date,
            time,
            location,
            capacity,
            address,
            services,
            campType,
            applyLink,
            author:userId
        });

        await newCamp.save();
        return handleSuccess(res, 201, "Medical Camp created successfully", newCamp);
    } catch (error) {
        console.error("Error creating medical camp:", error);
        return handleError(res, 500, "Internal server error");
    }
}

export const getMedicalCamps = async (req, res) => {
    try {
        const camps = await MedicalCamp.find();
        return handleSuccess(res, 200, "Medical Camps retrieved successfully", camps);
    } catch (error) {
        console.error("Error retrieving medical camps:", error);
        return handleError(res, 500, "Internal server error");
    }
}

// export const getMedicalCampById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const camp = await MedicalCamp.findById(id);
//         if (!camp) {
//             return handleError(res, 404, "Medical Camp not found");
//         }
//         return handleSuccess(res, 200, "Medical Camp retrieved successfully", camp);
//     } catch (error) {
//         console.error("Error retrieving medical camp:", error);
//         return handleError(res, 500, "Internal server error");
//     }
// }

export const deleteMedicalCamp = async (req, res) => {  
    const { id } = req.params;
    try {
        const camp = await MedicalCamp.findByIdAndDelete(id);
        if (!camp) {
            return handleError(res, 404, "Medical Camp not found");
        }
        return handleSuccess(res, 200, "Medical Camp deleted successfully", camp);
    } catch (error) {
        console.error("Error deleting medical camp:", error);
        return handleError(res, 500, "Internal server error");
    }
}
