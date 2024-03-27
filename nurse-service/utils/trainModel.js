import dataTest from "../dataset/symptomToDisease.json" assert { type: "json" };
import symptom from "../dataset/symptom.json" assert { type: "json" };
import diseaseData from "../dataset/diseaseData.json" assert { type: "json" };
import tf from "@tensorflow/tfjs";
import "tfjs-node-save";
export const convertTrainingInput = (dataInput) => {
    const result = [];
    for (let i = 0; i < symptom.length; i++) {
        result.push(dataInput[`symptom${i}`]);
    }
    return result;
};
const preprocessData = () => {
    const processedData = dataTest.map((disease) => {
        const newDisease = { disease: disease.Disease };
        for (const symp of Object.values(disease)) {
            const index = symptom.findIndex((item) => item.Symptom === symp);
            if (index !== -1) {
                newDisease[`symptom${index}`] = symp;
            }
        }
        return newDisease;
    });
    return processedData;
};
const trainModel = async () => {
    const data = preprocessData();
    const diseaseConvert = (disease) => {
        const result = [];
        for (const item of diseaseData) {
            if (disease.disease === item.Disease) {
                result.push(1);
            } else {
                result.push(0);
            }
        }
        return result;
    };
    console.log(data.map((item) => {
        return diseaseConvert(item);
    }))
    const trainingData = tf.tensor2d(
        data.map((item) =>
            convertTrainingInput(item).map((data) => {
                return symptom.findIndex((index) => index.Symptom === data);
            })
        )
    );
    const outputData = tf.tensor2d(
        data.map((item) => {
            return diseaseConvert(item);
        })
    );
    const model = tf.sequential();
    //add the first layer
    model.add(
        tf.layers.dense({
            inputShape: [symptom.length], // input neurons
            activation: "sigmoid",
            units: 5, //dimension of output space (first hidden layer)
        })
    );
    //add the hidden layer
    model.add(
        tf.layers.dense({
            inputShape: [5], //dimension of hidden layer
            activation: "sigmoid",
            units: 41, //dimension of final output
        })
    );
    //add output layer
    model.add(
        tf.layers.dense({
            activation: "sigmoid",
            units: 41, //dimension of final output
        })
    );
    //compile the model with an MSE loss function and Adam algorithm
    model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(0.06),
    });
    console.log(model.summary());

    async function run() {
        const startTime = Date.now();
        let elapsedTime;
        //train the model
        await model.fit(trainingData, outputData, {
            epochs: 200,
            callbacks: {
                //list of callbacks to be called during training
                onEpochEnd: async (epoch, log) => {
                    console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
                    elapsedTime = Date.now() - startTime;
                    console.log("elapsed time: " + elapsedTime);
                },
            },
        });
        //model.save("file://nurse-service/utils/trainedModel/")
        return model;
    }
    return run();
};

export default trainModel;
