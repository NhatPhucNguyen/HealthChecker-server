import VitalSign from "../models/VitalSign.js";

export const getAllVitalSign = async () => {
    const vitalSigns = await VitalSign.find();
    return vitalSigns;
};

export const getVitalSignById = async (_, { id }) => {
    const vitalSign = await VitalSign.findById(id);
    return vitalSign;
};

export const getVitalSignByPatient = async (_, { patientId }) => {
    const vitalSign = await VitalSign.find({ patient: patientId });
    return vitalSign;
};

export const addVitalSign = async (_, { vitalSignInput }) => {
    const newVitalSign = new VitalSign(vitalSignInput);
    return await newVitalSign.save();
};

export const updateVitalSign = async (_, { id, vitalSignInput }) => {
    const updatedVitalSign = await VitalSign.findByIdAndUpdate(
        id,
        vitalSignInput,
        {
            new: true,
        }
    );
    if (!updatedVitalSign) {
        throw new Error("Vital sign not found");
    }
    return updatedVitalSign;
};

export const deleteVitalSign = async (_, { id }) => {
    const deletedVitalSign = await VitalSign.findByIdAndDelete(id);
    return deletedVitalSign;
};
