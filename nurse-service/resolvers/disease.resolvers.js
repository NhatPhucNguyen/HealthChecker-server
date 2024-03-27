import trainModel from "../utils/trainModel.js";
import symptomData from "../dataset/symptom.json" assert { type: "json" };
import diseaseData from "../dataset/diseaseData.json" assert { type: "json" };
import { convertTrainingInput } from "../utils/trainModel.js";
import tf from "@tensorflow/tfjs";
const convertInput = (symptomList) => {
    const input = {};
    symptomList.forEach((item) => {
        const index = symptomData.findIndex(
            (symptom) => symptom.Symptom === item
        );
        if (index !== -1) {
            input[`symptom${index}`] = item;
        }
    });
    return [input];
};

export const getAllSymptoms = async () => {
    const processedSymptoms = symptomData
        .map((symptom) => symptom.Symptom)
        .map((item) => {
            const newName = item.split("_").join(" ");
            return {
                label: newName.charAt(0).toUpperCase() + newName.substring(1),
                value: item,
            };
        });
    return processedSymptoms;
};

export const predictDisease = async (_, { symptoms }) => {
    const model = await trainModel();
    const inputData = tf.tensor2d(
        convertInput(symptoms).map((item) =>
            convertTrainingInput(item).map((data) => {
                return symptomData.findIndex((index) => index.Symptom === data);
            })
        )
    );
    const results = model.predict(inputData);
    const resultArr = await results.arraySync();
    let foundDiseases = new Set();
    for (const arr of resultArr) {
        arr.forEach((item, index) => {
            if (item > 0.2) {
                foundDiseases.add(diseaseData[index]);
            }
        });
    }
    console.log(resultArr[0]);
    console.log(foundDiseases);
    const convertedResult = Array.from(foundDiseases).map((item) => {
        return { disease: item.Disease, description: item.Description };
    });
    return convertedResult;
};
